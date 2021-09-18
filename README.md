# collapse-unopened-explorer

This extension attempts to keep the Explorer neat and tidy by only
expanding the directories of the files that are currently in the editor tabs. 

## Features

When commanded (Collapse Unopened Explorer Tabs), this extension will collapse any directories that aren't relevant to the open editor tabs. The extension idea and structure has been forked from LukeGeneva/vscode-auto-collapse-explorer on github.  

Thanks for trying out this extension! Hope you enjoy!

## Contributing

Pull requests are welcome. I would love to hear your efficient workarounds for accessing the IOExplorerService tree from extension land. Waiting on vscode github issue #3553 to see some action there and then I might reintroduce the "auto" functionality (using the vscode.window.onDidChangeActiveTextEditor() API callback).
