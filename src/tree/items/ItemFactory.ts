import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");
import { CrateItem } from "./CrateItem";
import { TreeItemContext } from "./TreeItemContext";
import { TreeItem } from "./TreeItem";
import { fileExists } from "../../utils/FileSystem";
import { parse, JsonMap } from "@iarna/toml";

export async function createCrateFromWorkspace(
    workspaceCargoTomlUri: vscode.Uri
): Promise<TreeItem[]> {
    if (!fileExists(workspaceCargoTomlUri)) {
        return [];
    }

    const cargoToml = await parse
        .async(
            await fs.promises
                .readFile(workspaceCargoTomlUri.fsPath, {
                    encoding: "utf-8",
                })
                .then((s) => s)
        )
        .then((obj) => obj);

    const toCrate = (crateName: string): CrateItem => {
        const cargoTomlUri = vscode.Uri.joinPath(
            vscode.Uri.file(path.dirname(workspaceCargoTomlUri.fsPath)),
            crateName,
            "Cargo.toml"
        );
        if (fileExists(cargoTomlUri)) {
            return new CrateItem(
                new TreeItemContext(
                    crateName,
                    cargoTomlUri,
                    vscode.FileType.Directory
                ),
                vscode.TreeItemCollapsibleState.Collapsed
            );
        } else {
            return new CrateItem(
                new TreeItemContext(
                    crateName,
                    cargoTomlUri,
                    vscode.FileType.Directory
                ),
                vscode.TreeItemCollapsibleState.None
            );
        }
    };

    const workspace = cargoToml["workspace"] as JsonMap;
    if (workspace) {
        const members = workspace["members"] as string[];
        return members ? members.map((member) => toCrate(member)) : [];
    } else {
        vscode.window.showInformationMessage(workspaceCargoTomlUri.fsPath);
        return [
            toCrate(path.basename(path.dirname(workspaceCargoTomlUri.fsPath))),
        ];
        throw new Error("Method not implemented.");
    }
}
