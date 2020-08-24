import * as vscode from "vscode";
import { TreeItem } from "./TreeItem";
import { TreeItemContext } from "./TreeItemContext";
import { icons } from "./IconMap";
import { createModule } from "./ItemFactory";

export class ModuleFileItem extends TreeItem {
    createChildren(childContext: TreeItemContext): Promise<TreeItem[]> {
        throw new Error("ModuleFileItem: Method not implemented.");
        let children = createModule(this.context.uri);
        return children;
    }

    iconPath = icons.get("ModuleFile");
}
