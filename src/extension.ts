import * as fs from 'fs';
import * as path from 'path';
import { ExtensionContext, workspace } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export function activate(_context: ExtensionContext): void {
  // pgls is opt-in per workspace. Activation requires a `.pgls.json`
  // at one of the workspace folder roots — the same file pgls itself
  // treats as the authoritative config source. Without it there's
  // nothing for pgls to do, and starting the language server would
  // just leave a silent idle process behind.
  if (!workspaceHasPglsConfig()) {
    return;
  }

  const cfg = workspace.getConfiguration('pgls');
  const command = cfg.get<string>('command', 'pgls');

  const serverOptions: ServerOptions = {
    run: { command },
    debug: { command },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'sql' },
      { scheme: 'file', language: 'go' },
    ],
  };

  client = new LanguageClient('pgls', 'pgls', serverOptions, clientOptions);
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}

function workspaceHasPglsConfig(): boolean {
  const folders = workspace.workspaceFolders ?? [];
  for (const folder of folders) {
    if (folder.uri.scheme !== 'file') {
      continue;
    }
    if (fs.existsSync(path.join(folder.uri.fsPath, '.pgls.json'))) {
      return true;
    }
  }
  return false;
}
