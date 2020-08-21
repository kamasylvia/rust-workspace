import * as vscode from "vscode";
import * as fs from "fs";
import { TreeItem } from "./TreeItem";
import { ITreeItem } from "./ITreeItem";
import { fileExists } from "../../utils/FileSystem";
import { parse, JsonMap } from "@iarna/toml";
import { CrateItem } from "./CrateItem";
import { TreeItemContext } from "./TreeItemContext";

export class WorkspaceItem extends TreeItem implements ITreeItem {
    async createChildren(
        childContext?: import("./TreeItemContext").TreeItemContext | undefined
    ): Promise<TreeItem[]> {
        const rootUri = this.context.uri;
        const rootCargoTomlUri = vscode.Uri.joinPath(rootUri, "Cargo.toml");

        if (!fileExists(rootCargoTomlUri)) {
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
            vscode.window.showInformationMessage(rootCargoTomlUri.fsPath);
            const crateName = (cargoTomlObj[
                "package"
            ] as JsonMap["name"]) as string;
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
}
