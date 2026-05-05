# pgls-vscode

VSCode client for the [pgls](https://github.com/winebarrel/pgls) PostgreSQL
language server.

Provides completion, hover, and diagnostics for SQL — both inside `.sql`
files and inside SQL string literals embedded in `.go` source.

## Prerequisite

Install the `pgls` server binary:

```sh
go install github.com/winebarrel/pgls@latest
```

Make sure `pgls` is on your `$PATH`. The extension defaults to invoking it
by that name; configure `pgls.command` to point elsewhere if needed.

## Install (development)

```sh
npm install
npm run compile
```

Open this folder in VSCode and press `F5` to launch an Extension Development
Host with the extension loaded. In that host, open a workspace that has a
`db/schema/` directory containing `CREATE TABLE` files — completions and
diagnostics will fire on `.sql` and `.go` files.

## Install (VSIX)

```sh
npm install
npm run compile
npm run package        # produces pgls-vscode-<version>.vsix
```

In VSCode: Extensions → `...` → **Install from VSIX...**

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `pgls.command` | `pgls` | Path or name of the server executable. |
| `pgls.schemaDir` | `db/schema` | Directory of DDL files, relative to the workspace root. |

Per-workspace overrides go in `.vscode/settings.json`:

```json
{ "pgls.schemaDir": "db/migrations" }
```

## License

MIT
