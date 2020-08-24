import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");
import { CrateItem } from "./CrateItem";
import { TreeItemContext } from "./TreeItemContext";
import { TreeItem } from "./TreeItem";
import { fileExists, listAll, fileType } from "../../utils/FileSystem";
import { parse, JsonMap } from "@iarna/toml";
import { ModuleFileItem } from "./ModuleFileItem";
import { showAndThrowError } from "../../utils/Errors";
import { ModuleDirectoryItem } from "./ModuleDirectoryItem";

export async function createCrate(rootUri: vscode.Uri): Promise<TreeItem[]> {
    const rootCargoTomlUri = vscode.Uri.joinPath(rootUri, "Cargo.toml");

    if (!(await fileExists(rootCargoTomlUri))) {
        return [];
    }

    const cargoTomlObj = await parse.async(
        await fs.promises.readFile(rootCargoTomlUri.fsPath, "utf-8")
    );

    const toCrate = (crateName: string): CrateItem => {
        const cargoDirUri = vscode.Uri.joinPath(rootUri, crateName);
        if (fileExists(cargoDirUri)) {
            return new CrateItem(
                new TreeItemContext(
                    crateName,
                    cargoDirUri,
                    vscode.FileType.Directory
                ),
                vscode.TreeItemCollapsibleState.Collapsed
            );
        } else {
            return new CrateItem(
                new TreeItemContext(
                    crateName,
                    cargoDirUri,
                    vscode.FileType.Directory
                ),
                vscode.TreeItemCollapsibleState.None
            );
        }
    };

    const workspace = cargoTomlObj["workspace"] as JsonMap;
    if (workspace) {
        const members = workspace["members"] as string[];
        return members ? members.map((member) => toCrate(member)) : [];
    } else {
        const crateName = (cargoTomlObj["package"] as JsonMap)[
            "name"
        ] as string;
        if (!crateName) {
            vscode.window.showWarningMessage(
                "Your Cargo.toml does not have a package name."
            );
            throw new Error("");
        }
        return [
            new CrateItem(
                new TreeItemContext(
                    crateName,
                    rootUri,
                    vscode.FileType.Directory
                ),
                vscode.TreeItemCollapsibleState.Expanded
            ),
        ];
    }
}

export async function createModule(uri: vscode.Uri): Promise<TreeItem[]> {
    if (!(await fileExists(uri))) {
        showAndThrowError(`The directory ${uri.fsPath} does not exist.`);
    }

    let childrenContext: TreeItemContext[] = [];
    let children = await listAll(uri);

    for (const [k, v] of children.entries()) {
        if (
            await ((fileType(v).then((type) => type === vscode.FileType.File) &&
                v.fsPath.endsWith(".rs")) ||
                (fileType(v).then(
                    (type) => type === vscode.FileType.Directory
                ) &&
                    fileExists(vscode.Uri.joinPath(v, "mod.rs"))))
        ) {
            childrenContext.push(new TreeItemContext(k, v, await fileType(v)));
        }
    }

    let result: TreeItem[] = childrenContext.map((context) =>
        context.type === vscode.FileType.File
            ? new ModuleFileItem(
                  context,
                  vscode.TreeItemCollapsibleState.Collapsed
              )
            : new ModuleDirectoryItem(
                  context,
                  vscode.TreeItemCollapsibleState.Collapsed
              )
    );

    return result;
}
