import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { ModItem } from "./ModItem";

export class FileItem extends ModItem {
    contextValue = "fileItem";
}
