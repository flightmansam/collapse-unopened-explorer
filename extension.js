const { window, commands, workspace } = require('vscode');

const COLLAPSE = 'workbench.files.action.collapseExplorerFolders';
const REVEAL = 'revealInExplorer';
const FOCUS_EDITOR = 'workbench.action.focusActiveEditorGroup';

function activate(context) {
  const subscription = window.onDidChangeActiveTextEditor(showOnlyOpenFiles);
  context.subscriptions.push(subscription);
}

async function showOnlyOpenFiles(textEditor) {
  const fileExpectedInExplorer = textEditor?.document.uri.scheme === 'file';
  if (!fileExpectedInExplorer) return;

  await commands.executeCommand(COLLAPSE);

  //sort textDocuments such that textEditor.document is last
  var docs = workspace.textDocuments.filter(doc => {return doc.fileName != textEditor.document.fileName});
  console.log(docs);
  console.log(textEditor.document.fileName);
  docs = docs.concat(textEditor.document);
  console.log(docs);

  for (var doc in docs) {
    if (Object.hasOwnProperty.call(workspace.textDocuments, doc)) {
      doc = docs[doc];

      console.log(doc.fileName);

      await commands.executeCommand(REVEAL, doc.uri);
    }
  }

  await commands.executeCommand(FOCUS_EDITOR);
}

function deactivate() {}

// @ts-ignore
module.exports = {
  activate,
  deactivate,
};


