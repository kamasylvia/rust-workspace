import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { ITreeItem } from "./ITreeItem";
import { TreeItemContext } from "./TreeItemContext";
import { listAll, fileType } from "../../utils/FileSystem";
import { FileItem } from "./fileItem";
import path = require("path");
import { iconMap } from "./IconMap";

export class CrateItem extends TreeItem implements ITreeItem {
    public children = this.createChildren();

    createChildren(): Promise<TreeItem[]> {
        let uri = this.context.uri;
        let childrenContext: TreeItemContext[] = [];
        listAll(uri).then((dict) =>
            dict.forEach(async (v, k) =>
                childrenContext.push(
                    new TreeItemContext(k, v, await fileType(v))
                )
            )
        );
        let result: FileItem[] = childrenContext.map(
            (context) =>
                new FileItem(context, vscode.TreeItemCollapsibleState.Collapsed)
        );
        return Promise.resolve(result);

        throw new Error("Method not implemented.");
    }

    iconPath = iconMap.get("crate");
    contextValue = "crateItem";
}
