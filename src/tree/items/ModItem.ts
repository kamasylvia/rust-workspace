import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { TreeItemContext } from "./TreeItemContext";

export class ModItem extends TreeItem {
    createChildren(childContext: TreeItemContext): Promise<TreeItem[]> {
        throw new Error("Method not implemented.");
    }
}
