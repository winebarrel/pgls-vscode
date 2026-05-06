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

The extension shells out to the `pgls` server binary. Install it
following the
[pgls install instructions](https://github.com/winebarrel/pgls#install)
— either drop a pre-built archive on your `$PATH` or `go install`
it from source.

The extension expects `pgls` to be on `$PATH`; set `pgls.command`
in your VSCode settings to point elsewhere if it lives somewhere
custom.

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

The extension activates only when the workspace contains a
`.pgls.json` at one of its folder roots — that file is pgls's
opt-in signal. Workspaces without `.pgls.json` see nothing from
this extension, so no idle language server gets spawned.

Drop a `.pgls.json` at the workspace root pointing at your DDL:

```json
{ "schemaDir": "db/schema" }
```

See the [pgls README](https://github.com/winebarrel/pgls#quickstart)
for the full set of fields (`schemaDir`, `sqlFunctions`, etc.). The
file is pgls's authoritative config — committing it to the repo
gives every contributor the same behaviour across every editor
(VSCode, Vim, Neovim, Helix, plain CLI).

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `pgls.command` | `pgls` | Path or name of the server executable. |

## Try it

A complete demo workspace lives at
[winebarrel/pgls-example](https://github.com/winebarrel/pgls-example) —
clone, open in VSCode with this extension installed, and the SQL
strings in `main.go` and `example.sql` should light up immediately.

## License

MIT
