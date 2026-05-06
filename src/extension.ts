import { ExtensionContext, OutputChannel, window, workspace } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;
let log: OutputChannel | undefined;

export function activate(context: ExtensionContext): void {
  log = window.createOutputChannel('pgls (extension)');
  context.subscriptions.push(log);

  const cfg = workspace.getConfiguration('pgls');
  const command = cfg.get<string>('command', 'pgls');
  const schemaDir = cfg.get<string>('schemaDir', 'db/schema');

  log.appendLine(
    `activate: command=${command} schemaDir=${schemaDir} cwd=${
      workspace.workspaceFolders?.[0]?.uri.fsPath ?? '(none)'
    }`,
  );

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

  client.start().then(
    () => log?.appendLine('language client started'),
    (err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      log?.appendLine(`language client failed to start: ${msg}`);
      void window.showErrorMessage(
        `pgls: failed to start the language server (${msg}). ` +
          `Ensure the \`pgls\` binary is on $PATH or set \`pgls.command\` ` +
          `to its absolute path.`,
      );
    },
  );
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
