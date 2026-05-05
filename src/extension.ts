import { ExtensionContext, workspace } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export function activate(_context: ExtensionContext): void {
  const cfg = workspace.getConfiguration('pgls');
  const command = cfg.get<string>('command', 'pgls');
  const schemaDir = cfg.get<string>('schemaDir', 'db/schema');

  const serverOptions: ServerOptions = {
    run: { command },
    debug: { command },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'sql' },
      { scheme: 'file', language: 'go' },
    ],
    initializationOptions: { schemaDir },
  };

  client = new LanguageClient('pgls', 'pgls', serverOptions, clientOptions);
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
