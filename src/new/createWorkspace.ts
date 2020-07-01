import * as vscode from "vscode";

export async function createWorkspace(uri: vscode.Uri) {
    const rootUri = vscode.workspace.workspaceFolders?.[0].uri;
    vscode.window.showInformationMessage(
        rootUri ? rootUri.fsPath : "No folder open."
    );
}
