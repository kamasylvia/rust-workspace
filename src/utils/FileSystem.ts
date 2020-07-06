import * as vscode from "vscode";
import * as fs from "fs";

export const workspaceRootUri = vscode.workspace.workspaceFolders?.[0].uri;

export async function fileExists(uri: vscode.Uri): Promise<boolean> {
    return await vscode.workspace.fs
        .stat(uri)
        .then((stat) => (stat.type ? true : false))
        .then(undefined, (isRejected) => !isRejected);
}

export async function fileType(uri: vscode.Uri): Promise<vscode.FileType> {
    return (await vscode.workspace.fs.stat(uri).then((stat) => stat)).type;
}

export async function listWithExtension(
    uri: vscode.Uri,
    extension: string
): Promise<Map<string, vscode.Uri>> {
    let result: Map<string, vscode.Uri> = new Map();

    await fs.promises.readdir(uri.fsPath).then((fileNames) =>
        fileNames.map((name) => {
            if (name.endsWith(extension)) {
                fileNames.map((name) =>
                    result.set(name, vscode.Uri.joinPath(uri, name))
                );
            }
        })
    );

    return result;
}

export async function listWithType(
    uri: vscode.Uri,
    type: vscode.FileType
): Promise<Map<string, vscode.Uri>> {
    let result: Map<string, vscode.Uri> = new Map();

    await fs.promises.readdir(uri.fsPath).then((fileNames) =>
        fileNames.map((name) => {
            if (
                vscode.workspace.fs
                    .stat(uri)
                    .then((fileStat) => fileStat.type === type)
            ) {
                fileNames.map((name) =>
                    result.set(name, vscode.Uri.joinPath(uri, name))
                );
            }
        })
    );

    return result;
}

export async function listAll(
    uri: vscode.Uri
): Promise<Map<string, vscode.Uri>> {
    let result: Map<string, vscode.Uri> = new Map();

    await fs.promises
        .readdir(uri.fsPath)
        .then((fileNames) =>
            fileNames.map((name) =>
                result.set(name, vscode.Uri.joinPath(uri, name))
            )
        );

    return result;
}
