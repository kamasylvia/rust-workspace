import { workspaceRootUri } from "../../utils/FileSystem";
import * as vscode from "vscode";
import path = require("path");

export const icons = new Map<string, string>([
    [
        "crate",
        path.join(
            __filename,
            "..",
            "..",
            "..",
            "..",
            "resources",
            "icons",
            "vs",
            "crate.svg"
        ),
    ],
    [
        "module",
        path.join(
            __filename,
            "..",
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
            "..",
            "resources",
            "icons",
            "vs",
            "reference.svg"
        ),
    ],
]);
