<img src="https://certifie.github.io/mergecat/favicon.svg" alt="" width="72" align="right">

# mergecat

**mergecat** raggruppa la storia Git di un branch per integrazione, come i changeset di TFS, e
segue ogni modifica dal branch al deploy: branch, tag, pull request, pipeline e ambienti, con un
report di audit pronto per la conformità (EU AI Act, NIS2). Funziona con GitHub, GitLab e Azure
DevOps.

È disponibile come:

- **app desktop** per macOS, Windows e Linux;
- **estensione per VS Code**;
- **plugin per Claude Code** (server MCP).

Sito e documentazione: **https://certifie.github.io/mergecat/**

## Download

Scarica l'ultima versione dalla pagina delle
[**release**](https://github.com/CERTIFIE/mergecat/releases/latest):

| Piattaforma | File |
|---|---|
| macOS (Apple Silicon) | `mergecat-mac-arm64.dmg` |
| Windows | `mergecat-windows-x64-setup.exe`, `mergecat-windows-arm64-setup.exe` |
| Linux | `.AppImage`, `.deb` e `.rpm` (x86_64 e arm64) |
| VS Code | `mergecat-vscode.vsix` |
| Claude Code | `mergecat-claude-plugin.zip`, `mergecat-mcp.cjs` |

Istruzioni di installazione: [documentazione](https://certifie.github.io/mergecat/it/docs/installation/).

### Plugin per Claude Code

Questo repository è anche il marketplace del plugin. Serve Node.js 20 o successivo. In un
terminale:

```bash
claude plugin marketplace add CERTIFIE/mergecat
claude plugin install mergecat@mergecat-local
```

Poi riavvia Claude Code ed esegui `/mergecat:changelog` o `/mergecat:tags`. Per aggiornarlo:
`claude plugin marketplace update mergecat-local` e `claude plugin update mergecat@mergecat-local`.
La cartella `plugins/mergecat` viene aggiornata automaticamente a ogni release stabile.

## Licenza

mergecat è un software **gratuito ma non open source**: il codice sorgente non è pubblico.
Chiunque può scaricarlo e usarlo liberamente, anche per scopi commerciali. Non è consentito
copiarlo, decompilarlo, sottoporlo a reverse engineering o redistribuirne versioni modificate.
I termini completi sono nel file [LICENSE.md](LICENSE.md).

## Sostieni il progetto

Se mergecat ti è utile, puoi sostenerne lo sviluppo con una donazione, anche simbolica. Non è
obbligatoria, ma è un modo gradito per dimostrare apprezzamento, soprattutto se lo usi in
azienda. Il link per donare sarà disponibile a breve.

## Suggerimenti e segnalazioni

Bug, suggerimenti e richieste di nuove funzionalità sono benvenuti nelle
[**issue**](https://github.com/CERTIFIE/mergecat/issues) di questo repository. Prima di aprirne
una nuova, controlla che non esista già una segnalazione simile.

## Partecipa allo sviluppo

Vuoi entrare nel team di sviluppo? Scrivi a **[info@certifie.me](mailto:info@certifie.me)**
presentandoti brevemente. Per ora valutiamo solo sviluppatori di madrelingua italiana o con
un'ottima conoscenza della lingua italiana.

---

© 2026 CERTIFIE. Tutti i diritti riservati.
