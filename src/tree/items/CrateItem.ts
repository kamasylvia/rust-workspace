import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { ITreeItem } from "./ITreeItem";
import { TreeItemContext } from "./TreeItemContext";
import { listAll, fileType, fileExists } from "../../utils/FileSystem";
import path = require("path");
import { icons } from "./IconMap";
import { ModuleItem } from "./ModuleItem";
import { showAndThrowError } from "../../utils/Errors";
import { createModule } from "./ItemFactory";

export class CrateItem extends TreeItem implements ITreeItem {
    cargoUri = vscode.Uri.joinPath(this.context.uri, "Cargo.toml");
    srcUri = vscode.Uri.joinPath(this.context.uri, "src");

    async createChildren(): Promise<TreeItem[]> {
        return createModule(this.srcUri); 
    }

    iconPath = icons.get("crate");

    contextValue = "crateItem";
}
