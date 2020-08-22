import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { TreeItemContext } from "./TreeItemContext";
import { icons } from "./IconMap";
import { moduleFactory } from "./ItemFactory";

export class ModuleItem extends TreeItem {
    createChildren(childContext: TreeItemContext): Promise<TreeItem[]> {
        let children = moduleFactory(this.context.uri);
        return children;
    }

    iconPath = icons.get("module");
}
