import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";

export class TreeItemContext {
    constructor(
        public readonly label: string,
        public readonly uri: vscode.Uri,
        public readonly type: vscode.FileType = vscode.FileType.File
    ) {}

    copy(mod?: Module, parent?: TreeItem): TreeItemContext {
        return new TreeItemContext(this.label, this.uri, this.type);
    }
}
