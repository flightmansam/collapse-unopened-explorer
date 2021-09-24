const vscode = require('vscode');

const COLLAPSE = 'workbench.files.action.collapseExplorerFolders';
const REVEAL = 'revealInExplorer';
const FOCUS_EDITOR = 'workbench.action.focusActiveEditorGroup';
const NEXT_EDITOR = 'workbench.action.nextEditor'
const DEBUG = false;
const MAX_CYCLES = 50;

async function activate(context) {
  // const subscription = vscode.window.onDidChangeActiveTextEditor(showOnlyOpenFiles);
  // context.subscriptions.push(subscription);
  const command = 'collapse-unopened-explorer.collapseUnopened';

  context.subscriptions.push(vscode.commands.registerCommand(command, collapseUnopened));

  /*
  This is a workaround for https://github.com/Microsoft/vscode/issues/15178 until a proper alternative is identified
  */
  const initEditor = vscode.window.activeTextEditor;
  var n_cycles = 0;
  do {
    if (DEBUG) console.log(vscode.window.activeTextEditor.document.fileName);

    await vscode.commands.executeCommand(NEXT_EDITOR);
    // vscode.workbench.action.nextEditor();
    if (DEBUG) console.log(vscode.window.activeTextEditor.document.fileName);
    n_cycles += 1;
    if (DEBUG) console.log(n_cycles);
  } while ((vscode.window.activeTextEditor.document.uri != initEditor.document.uri) &&  (n_cycles < MAX_CYCLES));

}

async function collapseUnopened() {
  const textEditor = vscode.window.activeTextEditor;
  const fileExpectedInExplorer = textEditor?.document.uri.scheme === 'file';
  if (!fileExpectedInExplorer) return;

  await vscode.commands.executeCommand(COLLAPSE);

  //sort textDocuments such that textEditor.document is last
  var docs = vscode.workspace.textDocuments.filter(doc => {return doc.fileName != textEditor.document.fileName}).concat(textEditor.document);
  // var docs = vscode.window.visibleTextEditors.filter(doc => {return doc.fileName != textEditor.document.fileName}).concat(textEditor.document);
  for (var doc in docs) {
    if (Object.hasOwnProperty.call(vscode.workspace.textDocuments, doc)) {
      doc = docs[doc];

      if (DEBUG) console.log(doc.fileName);

      vscode.commands.executeCommand(REVEAL, doc.uri);
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


