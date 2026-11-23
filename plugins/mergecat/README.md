# mergecat plugin for Claude Code (and other AI assistants)

Lets Claude Code list the tags of a repository and write changelogs from what entered the main
branch, grouped by integration (merged pull request, merge or direct commit) and by release
(version tags), in the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

**Changelogs are documents of the conversation, not files of the project.** Claude publishes them
as a Markdown artifact (or sends the file, or shows it in the reply), from where you can open and
download them; nothing is written into the repository. Only `/mergecat:changelog … update file`
(or asking in words to update `CHANGELOG.md`) changes the project's `CHANGELOG.md`.

Changelogs are written **in English and as Markdown** by default; ask for another language
(`lang:it`, "in Italian") or for a **PDF** (`pdf`, "as PDF") when you need it.

**Compliance (EU AI Act, NIS2).** mergecat sends data of the repository to Claude. Once per session,
before the first changelog or tag list, Claude asks whether you use a Claude **Team or Enterprise**
account. *Yes*: the answer is recorded and the work goes on. *No*: Claude asks whether you are aware
of the EU AI Act and NIS2 and want to proceed anyway; *yes* goes on, *no* stops without reading the
repository. Every answer is saved as an audit record on your computer and given to you as a
document of the conversation. The MCP server enforces it: its repository tools refuse to run until
the answer allows it.

It contains:

- the **mergecat MCP server** (`server/mergecat-mcp.cjs`, built from `packages/mcp-server`): read-only on
  the repository; it writes only the compliance records and, on request, PDF files outside the project;
- the skill **`/mergecat:tags`**: the tags with date, commit, message, whether they are on the main
  branch and how many changes each release contains;
- the skill **`/mergecat:changelog`**: the changelog of the unreleased changes, of a version, of every
  release, or of a range `<from>..<to>` whose ends are tags, dates or commits; it reads the existing
  `CHANGELOG.md` and updates it only when asked.

## Install

From the root of the mergecat repository (which is also a local plugin marketplace):

```bash
npm run mcp:build
```

```bash
claude plugin marketplace add /path/to/mergecat
```

```bash
claude plugin install mergecat@mergecat
```

Then start Claude Code in any Git repository and run `/mergecat:tags` or
`/mergecat:changelog v1.2.0..v1.3.0`, or just ask "changelog from v1.2.0 to today".

To update an installed plugin after a rebuild:

```bash
claude plugin marketplace update mergecat
```

```bash
claude plugin update mergecat@mergecat
```

Then run `/reload-plugins` (or start a new session).

## Other AI assistants

This folder is also a portable [Agent Plugins](https://agent-plugins.org/) package: next to the
Claude Code manifest (`.claude-plugin/plugin.json`, `.mcp.json`) it has the portable one
(`plugin.json`, `mcp.json`), with the same skills and MCP server. **GitHub Copilot** (VS Code,
Copilot CLI) and **OpenAI Codex** install it from this repository as a plugin marketplace
(`chat.plugins.marketplaces` in VS Code, `codex plugin marketplace add` in Codex); **GitLab Duo**
uses the MCP server from its `mcp.json` and the skills copied to `.agents/skills/`. The mergecat VS
Code extension also offers the server to Copilot by itself (setting `mergecat.copilot.mcpServer`).
ChatGPT on the web and in the app is not supported: it uses only remote MCP servers.

The compliance question names the AI service of the client (a Claude Team or Enterprise account,
a GitHub Copilot Business or Enterprise license, a ChatGPT Business, Enterprise or Edu workspace,
GitLab Duo with a paid subscription); `MERGECAT_AI_SERVICE` sets it when the client is not
recognized. Setup for each assistant: `packages/website/src/content/docs/claude-code/other-assistants.mdx`
(on the website: Docs → Other AI assistants).

## Usage

| Command | What it does |
| --- | --- |
| `/mergecat:tags` | tags, newest first, with date, commit, message, on the main branch or not, changes since the previous version; `/mergecat:tags v2.*` filters, `/mergecat:tags versions` shows versions only |
| `/mergecat:changelog` | what is new since the newest release (`## [Unreleased]`), as a document of the conversation |
| `/mergecat:changelog v1.2.0..2026-03-31` | changelog of a range (ends: tag, date or commit), as a document |
| `/mergecat:changelog 1.4.0` | the unreleased changes as `## [1.4.0] - <today>` |
| `/mergecat:changelog all` | every release from the version tags |
| `/mergecat:changelog 1.4.0 update file` | the same, written into the project's `CHANGELOG.md` |
| `/mergecat:changelog v1.2.0..v1.3.0 lang:it` | the changelog in Italian (headings translated for `en`, `it`, `de`, `fr`, `es`; Claude translates other languages) |
| `/mergecat:changelog v1.2.0..v1.3.0 pdf` | the changelog as a PDF document (Markdown is the default) |

### Compliance records

| Answers | Outcome | Record |
| --- | --- | --- |
| Team or Enterprise: **yes** | proceeds | saved, and given in the conversation |
| **no**, then aware of AI Act/NIS2 and proceed: **yes** | proceeds | saved, and given in the conversation |
| **no**, then **no** | stops, no repository data read | saved; the copy in the conversation leaves out user, computer and repository |

Each record is a Markdown file (date and time, outcome, requested action, operating-system and Git
user, computer, repository and remote, AI service and model, data sent, questions and answers,
session) plus one line in `compliance-log.jsonl`, in:

- macOS: `~/Library/Application Support/mergecat/compliance/`
- Windows: `%APPDATA%\mergecat\compliance\`
- Linux: `$XDG_DATA_HOME/mergecat/compliance/` (default `~/.local/share/mergecat/compliance/`)

or in `MERGECAT_COMPLIANCE_DIR`. The question is asked again in every new session.

### Ranges

Each end of a range is a **tag**, a **date** (`YYYY-MM-DD`, optionally with a time and a zone) or a
**commit** (SHA or branch), in any combination; brackets are allowed (`[v1.2.0..v1.3.0]`).

| Range | Changes |
| --- | --- |
| `v1.2.0..v1.3.0` | release v1.3.0 |
| `v1.2.0..2026-03-31` | after v1.2.0, up to the end of 31 March 2026 |
| `2026-01-01..v1.3.0` | from 1 January 2026 (included) up to v1.3.0 |
| `2026-01-01..2026-03-31` | entered in the first quarter |
| `v1.2.0..abc1234`, `2026-01-01..abc1234` | up to that commit |
| `abc1234..v1.3.0`, `abc1234..2026-03-31`, `abc1234..def5678` | after that commit |
| `v1.3.0..`, `..v1.0.0` | up to the latest change, from the first commit |

The start is excluded and the end included. A date refers to when a change entered the main branch
(first-parent history), in the local time zone: as start it means "from that day on", as end "up to
the end of that day". If a name is both a tag and a date, the tag wins. Swapped ends are reported.

## MCP tools

The repository tools are read-only and locked until the compliance answer of the session allows
them; the repository is the `repository` path when given, else `MERGECAT_REPOSITORY`, else the Claude
Code project (`CLAUDE_PROJECT_DIR`), else the first folder open in the client that is a Git
repository (MCP roots, e.g. VS Code), else the working directory of the server.

| Tool | Returns |
| --- | --- |
| `compliance_status` | whether the compliance question was answered in this session, and the questions to ask |
| `record_compliance_answer` | records the user's answers (audit record on this computer), unlocks the tools on "proceed", returns the record as Markdown |
| `render_pdf` | writes a Markdown document (the final changelog) as a PDF outside the project; refuses the project folder unless allowed |
| `repository_info` | default branch, current branch, hosting service, version tags with dates |
| `tags` | every tag: date, commit, annotated or not, message, version or not, on the branch or not, previous version tag and changesets since it; changesets not released yet |
| `changelog` | Keep a Changelog draft plus structured data: per changeset the section and why, PR number and link, branch, commits, breaking/internal flags. `range` (`from..to`, each end a tag, date or commit) gives one release and how each end was resolved; `language` translates title, preamble and headings |
| `changesets` | what entered a branch (optional range, date, text and author filters) |
| `where_entered` | the integration that brought a commit into the branch, and the first tag that contains it |

In Claude Code the tool names are `mcp__plugin_mergecat_mergecat__<tool>`.

## Options

| Environment variable | Effect |
| --- | --- |
| `GITHUB_TOKEN` (or `GH_TOKEN`) | GitHub repositories: pull request titles, labels and linked issues (better sections and lines) |
| `GITLAB_TOKEN` (or `GL_TOKEN`) | GitLab repositories: the same for merge requests (`read_api` scope) |
| `AZURE_DEVOPS_EXT_PAT` (or `AZURE_DEVOPS_TOKEN`) | Azure DevOps repositories: a personal access token (or a Microsoft Entra token) for pull request data |
| `MERGECAT_AI_SERVICE` | the AI service the compliance question is about, when the client is not recognized: `claude`, `copilot`, `openai`, `gitlab-duo` or another name |
| `MERGECAT_GIT_PATH` | git executable, when it is not on the PATH |
| `MERGECAT_COMPLIANCE_DIR` | folder of the compliance records (default: see "Compliance records") |

PDFs use the standard PDF fonts: Latin-1 text (all Western European languages) is printed as is,
a few typographic characters (→, “ ”, …) become ASCII and other scripts are replaced with `?`; use
Markdown for languages written in other scripts.

## Without the plugin

The server also works as a plain MCP server (no skills, tools named `mcp__mergecat__<tool>`); its
instructions tell the client to give documents to the user in the conversation, not as files in
the project:

```bash
claude mcp add --transport stdio --scope user mergecat -- node /path/to/mergecat/plugins/mergecat/server/mergecat-mcp.cjs
```
