import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");
import { CrateItem } from "./CrateItem";
import { TreeItemContext } from "./TreeItemContext";
import { TreeItem } from "./TreeItem";
import { fileExists } from "../../utils/FileSystem";
import { parse, JsonMap } from "@iarna/toml";

export async function getCrate(rootUri: vscode.Uri): Promise<TreeItem[]> {
    const rootCargoTomlUri = vscode.Uri.joinPath(rootUri, "Cargo.toml");

    if (!fileExists(rootCargoTomlUri)) {
        return [];
    }

    const cargoTomlObj = await parse
        .async(
            await fs.promises
                .readFile(rootCargoTomlUri.fsPath, "utf-8")
                .then((s) => s)
        )
        .then((obj) => obj);

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
        vscode.window.showInformationMessage(rootCargoTomlUri.fsPath);
        const crateName = (cargoTomlObj[
            "package"
        ] as JsonMap["name"]) as string;
        return new CrateItem(
            new TreeItemContext(crateName, rootUri, vscode.FileType.Directory),
            vscode.TreeItemCollapsibleState.Expanded
        ).getChildren();
        throw new Error("Method not implemented.");
    }
}
