import { workspaceRootUri } from "../../utils/FileSystem";
import * as vscode from "vscode";
import path = require("path");

export const iconMap = new Map<string, string>([
    [
        "crate",
        path.join(
            __filename,
            "..",
            "..",
            "..",
            "resources",
            "icons",
            "vs",
            "solution.svg"
        ),
    ],
    [
        "module",
        path.join(
            __filename,
            "..",
            "..",
            "..",
            "resources",
            "icons",
            "vs",
            "module.svg"
        ),
    ],
    [
        "reference",
        path.join(
            __filename,
            "..",
            "..",
            "..",
            "resources",
            "icons",
            "vs",
            "reference.svg"
        ),
    ],
]);
