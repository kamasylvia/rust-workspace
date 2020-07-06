import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { ITreeItem } from "./ITreeItem";
import { TreeItemContext } from "./TreeItemContext";
import { listAll, fileType } from "../../utils/FileSystem";
import { FileItem } from "./fileItem";
import path = require("path");
import { icons } from "./IconMap";

export class CrateItem extends TreeItem implements ITreeItem {
    cargoUri = vscode.Uri.joinPath(this.context.uri, "Cargo.toml");

    async createChildren(): Promise<TreeItem[]> {
        let uri = this.context.uri;
        let childrenContext: TreeItemContext[] = [];
        let children = await listAll(uri).then((dict) => dict);

        for (const [k, v] of children.entries()) {
            childrenContext.push(new TreeItemContext(k, v, await fileType(v)));
        }

        let result: FileItem[] = childrenContext.map(
            (context) =>
                new FileItem(context, vscode.TreeItemCollapsibleState.Collapsed)
        );

        return Promise.resolve(result);
    }

    iconPath = icons.get("crate");
    contextValue = "crateItem";
}
