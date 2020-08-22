import * as vscode from "vscode";
import { TreeItemContext } from "./TreeItemContext";
import { ITreeItem } from "./ITreeItem";

export abstract class TreeItem extends vscode.TreeItem {
    constructor(
        public readonly context: TreeItemContext,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command,
        public readonly parent?: TreeItem,
        private _children?: TreeItem[]
    ) {
        super(context.label, collapsibleState);
    }

    public get tooltip(): string {
        return this.context.label;
    }

    public async getChildren(): Promise<TreeItem[]> {
        if (this._children) {
            return this._children;
        }

        let childContext = this.context.copy({ parent: this });
        return this.createChildren(childContext);
    }

    abstract async createChildren(
        childContext?: TreeItemContext
    ): Promise<TreeItem[]>;
}
