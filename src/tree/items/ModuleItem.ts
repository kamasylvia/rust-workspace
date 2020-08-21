import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { TreeItemContext } from "./TreeItemContext";
import { icons } from "./IconMap";

export class ModuleItem extends TreeItem {
    createChildren(childContext: TreeItemContext): Promise<TreeItem[]> {
        throw new Error("ModItem: Method not implemented.");
    }
    iconPath = icons.get("module");
}
