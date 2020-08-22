import * as vscode from "vscode";

export function showAndThrowError(message: string) {
    vscode.window.showErrorMessage(message);
    throw new Error("");
}
