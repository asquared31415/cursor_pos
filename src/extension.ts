import { ExtensionContext, StatusBarAlignment, StatusBarItem, window } from "vscode";

const StatusBarId = "cursor_pos";
const Alignment = StatusBarAlignment.Right;
const Priority = 101; // Immediately to the left of the line and column indicator.

let statusBarItem: StatusBarItem;

export function activate(context: ExtensionContext) {
    statusBarItem = window.createStatusBarItem(StatusBarId, Alignment, Priority);

    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(window.onDidChangeTextEditorSelection(updateStatusBarItem));

    // Update once on init.
    updateStatusBarItem();
}

function updateStatusBarItem() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor === undefined) {
        statusBarItem.hide();
    } else {
        const offset = activeEditor.document.offsetAt(activeEditor.selection.active);
        statusBarItem.text = `Offset ${offset}`;
        statusBarItem.show();
    }
}