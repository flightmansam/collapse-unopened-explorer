# collapse-unopened-explorer

This extension attempts to keep the Explorer neat and tidy by only
expanding the directories of the files that are currently in the editor tabs. 

## Features

When commanded (Collapse Unopened Explorer Tabs), this extension will collapse any directories that aren't relevant to the open editor tabs. The extension idea and structure has been forked from [LukeGeneva/vscode-auto-collapse-explorer](https://github.com/LukeGeneva/vscode-auto-collapse-explorer) on github.  

Thanks for trying out this extension! Hope you enjoy!

## Bugs
- A VSCode session begins with vscode.workspace.textDocuments being an empty array until all tabs are cycled through and "opened" so this command will collapse all if you run it once opening a session (kinda annoying). I am waiting on a resolve to the vscode [github issue #15178](https://github.com/Microsoft/vscode/issues/15178) API Access to "Open Editors". *__Current fix__*: cycle tabs when you open your workspace. Or just get straight to work and keep in mind that your explorer view might be exceptionally tidy if you haven't played with many tabs.

## Contributing

Pull requests are welcome. I would love to hear your efficient workarounds for accessing the IOExplorerService tree from extension land. Waiting on vscode [github issue #3553](https://github.com/microsoft/vscode/issues/3553) to see some action there and then I might reintroduce the "auto" functionality (using the vscode.window.onDidChangeActiveTextEditor() API callback).
