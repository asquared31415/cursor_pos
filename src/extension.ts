import { ExtensionContext, Position, StatusBarAlignment, StatusBarItem, window } from "vscode";

const StatusBarId = "cursor_pos";
const Alignment = StatusBarAlignment.Right;
const Priority = 101; // Immediately to the left of the line and column indicator.

let statusBarItem: StatusBarItem;

export function activate(context: ExtensionContext) {
    statusBarItem = window.createStatusBarItem(StatusBarId, Alignment, Priority);

    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(window.onDidChangeTextEditorSelection(updateStatusBarItem));
    context.subscriptions.push(window.onDidChangeActiveTextEditor(updateStatusBarItem));

    // Update once on init.
    updateStatusBarItem();
}

function updateStatusBarItem() {
    const activeEditor = window.activeTextEditor;
    // Don't show the status bar item if there's no editor
    // or if more than one selection is active.
    if (activeEditor === undefined || activeEditor.selections.length !== 1) {
        statusBarItem.hide();
    } else {
        const selection = activeEditor.selection;
        const start = selection.anchor;
        const end = selection.active;

        const startOffset = activeEditor.document.offsetAt(start);
        const endOffset = activeEditor.document.offsetAt(end);

        if (startOffset !== endOffset) {
            statusBarItem.text = `Offset ${startOffset}-${endOffset}`;
        } else {
            statusBarItem.text = `Offset ${startOffset}`;
        }

        statusBarItem.show();
    }
}