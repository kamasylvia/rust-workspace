import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { ModuleItem } from "./ModuleItem";

export class TreeItemContext {
    constructor(
        public readonly label: string,
        public readonly uri: vscode.Uri,
        public readonly type: vscode.FileType = vscode.FileType.File
    ) {}

    copy(mod?: ModuleItem, parent?: TreeItem): TreeItemContext {
        return new TreeItemContext(this.label, this.uri, this.type);
    }
}
