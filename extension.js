const vscode = require('vscode');

const COLLAPSE = 'workbench.files.action.collapseExplorerFolders';
const REVEAL = 'revealInExplorer';
const FOCUS_EDITOR = 'workbench.action.focusActiveEditorGroup';
const DEBUG = false;

function activate(context) {
  // const subscription = vscode.window.onDidChangeActiveTextEditor(showOnlyOpenFiles);
  // context.subscriptions.push(subscription);
  const command = 'collapse-unopened-explorer.collapseUnopened';

  context.subscriptions.push(vscode.commands.registerCommand(command, collapseUnopened));
}

async function collapseUnopened() {
  const textEditor = vscode.window.activeTextEditor;
  const fileExpectedInExplorer = textEditor?.document.uri.scheme === 'file';
  if (!fileExpectedInExplorer) return;

  await vscode.commands.executeCommand(COLLAPSE);

  //sort textDocuments such that textEditor.document is last
  var docs = vscode.workspace.textDocuments.filter(doc => {return doc.fileName != textEditor.document.fileName}).concat(textEditor.document);

  for (var doc in docs) {
    if (Object.hasOwnProperty.call(vscode.workspace.textDocuments, doc)) {
      doc = docs[doc];

      if (DEBUG) console.log(doc.fileName);

      await vscode.commands.executeCommand(REVEAL, doc.uri);
    }
  }

  await vscode.commands.executeCommand(FOCUS_EDITOR);
}

function deactivate() {}

// @ts-ignore
module.exports = {
  activate,
  deactivate,
};


