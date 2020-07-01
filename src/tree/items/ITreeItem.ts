import * as vscode from "vscode";
import { TreeItemContext } from "./TreeItemContext";
import { TreeItem } from "./TreeItem";

export interface ITreeItem {
    readonly context: TreeItemContext;
    readonly collapsibleState: vscode.TreeItemCollapsibleState;
    readonly command?: vscode.Command;
    readonly parent?: TreeItem;
    children?: Promise<TreeItem[]>;
    createChildren?(): Promise<TreeItem[]>;
}
