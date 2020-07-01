import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { TreeItemContext } from "./TreeItemContext";

export class FolderItem extends TreeItem {
    createChildren(childContext: TreeItemContext): Promise<TreeItem[]> {
        throw new Error("Method not implemented.");
    }
    contextValue = "folderItem";
}
