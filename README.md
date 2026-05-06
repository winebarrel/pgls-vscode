# pgls-vscode

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/winebarrel.pgls-vscode?label=Marketplace)](https://marketplace.visualstudio.com/items?itemName=winebarrel.pgls-vscode)

VSCode client for the [pgls](https://github.com/winebarrel/pgls) PostgreSQL
language server.

Provides completion, hover, goto-definition, document links, and
diagnostics for SQL — both inside `.sql` files and inside SQL string
literals embedded in `.go` source.

## Install

[![Install from
Marketplace](https://img.shields.io/badge/install-from%20marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=winebarrel.pgls-vscode)

Search for **pgls** in the VSCode Extensions panel, or open the
[Marketplace listing](https://marketplace.visualstudio.com/items?itemName=winebarrel.pgls-vscode)
directly.

## Prerequisite

Install the `pgls` server binary:

```sh
go install github.com/winebarrel/pgls@latest
```

Make sure `pgls` is on your `$PATH`. The extension defaults to invoking it
by that name; set `pgls.command` to point elsewhere if needed.

## Install from VSIX (manual)

```sh
npm install
npm run compile
npm run package        # produces pgls-vscode-<version>.vsix
```

In VSCode: Extensions → `...` → **Install from VSIX...**

## Install (development)

```sh
npm install
npm run compile
```

Open this folder in VSCode and press `F5` to launch an Extension
Development Host with the extension loaded.

## Schema configuration

pgls needs to know where your `CREATE TABLE` files live. Two ways to
tell it:

1. **`.pgls.json` at the workspace root (recommended).** pgls
   auto-discovers the file, so a single config works across every
   editor — VSCode, Vim, Neovim, Helix, plain CLI:

   ```json
   { "schemaDir": "db/schema" }
   ```

   Commit this to the repo and every contributor gets the same
   behaviour without per-editor wiring.

2. **VSCode-only setting.** Set `pgls.schemaDir` in
   `.vscode/settings.json` if you'd rather not commit `.pgls.json`
   (or want to override it per workstation):

   ```json
   { "pgls.schemaDir": "db/migrations" }
   ```

The VSCode setting takes precedence over `.pgls.json` when both are
present.

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `pgls.command` | `pgls` | Path or name of the server executable. |
| `pgls.schemaDir` | `db/schema` | DDL directory relative to the workspace root. Falls through to `.pgls.json` and pgls's own discovery when unset. |

## Try it

A complete demo workspace lives at
[winebarrel/pgls-example](https://github.com/winebarrel/pgls-example) —
clone, open in VSCode with this extension installed, and the SQL
strings in `main.go` and `example.sql` should light up immediately.

## License

MIT
