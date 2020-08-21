import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { ITreeItem } from "./ITreeItem";
import { TreeItemContext } from "./TreeItemContext";
import { listAll, fileType, listWithExtension } from "../../utils/FileSystem";
import path = require("path");
import { icons } from "./IconMap";
import { ModuleItem } from "./ModuleItem";

export class CrateItem extends TreeItem implements ITreeItem {
    cargoUri = vscode.Uri.joinPath(this.context.uri, "Cargo.toml");
    srcUri = vscode.Uri.joinPath(this.context.uri, "src");

    async createChildren(): Promise<TreeItem[]> {
        let uri = this.context.uri;
        let childrenContext: TreeItemContext[] = [];
        let children = await listWithExtension(this.srcUri, ".rs").then(
            (dict) => dict
        );

        for (const [k, v] of children.entries()) {
            childrenContext.push(new TreeItemContext(k, v, await fileType(v)));
        }

        let result: ModuleItem[] = childrenContext.map(
            (context) =>
                new ModuleItem(context, vscode.TreeItemCollapsibleState.Collapsed)
        );

        return Promise.resolve(result);
    }

    iconPath = icons.get("crate");

    contextValue = "crateItem";
}
