---
name: changelog
description: Write a changelog (Keep a Changelog) from what entered the main branch, using the mergecat MCP tools, as a document of the conversation - the unreleased changes, a version, every release, or a range whose ends are tags, dates or commits (v1.2.0..v1.3.0, v1.2.0..2026-03-31, 2026-01-01..2026-03-31, abc1234..v1.3.0). English and Markdown by default; another language (e.g. Italian) or a PDF when the user asks. Asks the compliance question (EU AI Act, NIS2) once per session first. Updates the project's CHANGELOG.md only when the user explicitly asks for it. Use when the user asks for a changelog or release notes, of a version or between two tags, dates or commits.
argument-hint: "[from..to | version | all] [pdf] [lang:<code>] [update file]   (range ends: tag | YYYY-MM-DD | commit)"
allowed-tools: mcp__plugin_mergecat_mergecat__compliance_status mcp__plugin_mergecat_mergecat__record_compliance_answer mcp__plugin_mergecat_mergecat__repository_info mcp__plugin_mergecat_mergecat__changelog mcp__plugin_mergecat_mergecat__tags mcp__plugin_mergecat_mergecat__changesets mcp__plugin_mergecat_mergecat__where_entered mcp__plugin_mergecat_mergecat__render_pdf AskUserQuestion Read
---

# Changelog with mergecat

The mergecat tools read the Git history grouped by integration: each merged pull request, merge or
direct commit that entered the branch is one changeset, already classified into Keep a Changelog
sections. Your job is to turn that draft into a good changelog for the people who use the project.

Arguments: `$ARGUMENTS` (if this shows the placeholder itself, your client does not fill it in:
take the arguments from the user's request).

| Argument | Changelog |
|---|---|
| (empty) | what is new since the newest release (`## [Unreleased]`) |
| `from..to` | only that range (see below) |
| `1.4.0` (a version) | the unreleased changes as `## [1.4.0] - <today>` |
| `all` | every release from the version tags |
| `pdf` (or "as PDF", "in PDF", "format:pdf") | a PDF document instead of Markdown (see "Format") |
| `md` / `markdown` | Markdown: the default, no need to ask for it |
| `lang:<code>` (e.g. `lang:it`) or words such as "in Italian", "in italiano" | the language of the changelog (see "Language") |
| `update file` (or the user asks in words to update/write `CHANGELOG.md`) | also update the project's `CHANGELOG.md`; without it, never touch files in the project |

Any other words are instructions for the text (audience, level of detail).

## Compliance confirmation (once per session)

mergecat sends data of the repository to the AI service of this conversation (Claude, GitHub
Copilot, OpenAI, GitLab Duo, ...: `compliance_status` names it in `aiService`, and its question asks
about that service's business plans): commit messages, authors, dates, branch and tag names, pull
request data. Before the first mergecat repository tool of the session:

1. Call `compliance_status`. If `confirmed` is true, the user already answered in this session:
   skip this section.
2. Ask the user the question in `questions.account`, translated into the language of the
   conversation, as a yes/no question: with a tool that asks the user a question with options if
   you have one (for example `AskUserQuestion`, options "Yes" and "No"), otherwise in your reply,
   then wait for the answer. Never answer for the user, never
   assume the answer, and call no other mergecat tool before it.
3. - **Yes** → call `record_compliance_answer` with `team_or_enterprise_account: true`.
   - **No** → ask the question in `questions.proceedIfNotTeamOrEnterprise` the same way (is the user
     aware of the EU AI Act and NIS2, and do they want to proceed anyway?), then call
     `record_compliance_answer` with `team_or_enterprise_account: false` and `aware_and_proceed`
     set to that answer.

   Always pass `requested_action` (what the user asked for, e.g. `changelog v1.2.0..v1.3.0 pdf`),
   `answers_verbatim` (the user's words or chosen options), `language` (of the questions) and
   `ai_model` (your model ID).
4. The tool writes the audit record on this computer and returns it as Markdown. Give it to the
   user as a **document of the conversation** (see "Deliver a document" below, file name
   `compliance-record-<repository>-<YYYY-MM-DD>.md`) and say in one line where the record is stored.
5. Outcome `proceed` → continue with the steps. Outcome `stopped` → stop: say in one line that
   mergecat read no repository data and can be used after confirming; call no other mergecat tool.

If a mergecat tool answers that the compliance confirmation is required, run this section first.

## Language

- The changelog is in **English** unless the user asks for another language (`lang:<code>` or in
  words). Writing the request in another language is not a request for that language.
- Pass `language` (ISO 639-1 code, e.g. `it`) to `changelog`. Title, preamble, section headings
  and "Unreleased" come translated for `en`, `it`, `de`, `fr`, `es`; for other languages the data
  says `headingsTranslated: false`: translate them yourself.
- Write every change line and the summary line in that language. Keep versions, dates, pull
  request links, issue references, code identifiers and file names as they are.
- When updating an existing `CHANGELOG.md` written in a different language from the one requested
  (or from English, when none was requested), ask once which language to use before writing it.

## Format

- **Markdown** is the default.
- **PDF** only when the user asks for it: build the final Markdown exactly as for the Markdown
  document, then call `render_pdf` with that Markdown, `title`, `file_name`
  `changelog-<repository>-<version or range>.pdf` and `folder` = your scratchpad directory if you
  have one (otherwise leave it empty: the system temporary folder). Deliver the PDF file as
  described in "Deliver a document".
- `CHANGELOG.md` in the project is always Markdown, also when the user asked for a PDF.

## Ranges

Each end of a range is a **tag**, a **date** or a **commit**, in any combination; brackets are
fine (`[v1.2.0..v1.3.0]`) and an end can be left open.

| Range | Meaning |
|---|---|
| `v1.2.0..v1.3.0` | the release v1.3.0 |
| `v1.2.0..2026-03-31` | after v1.2.0, up to the end of 31 March 2026 |
| `2026-01-01..v1.3.0` | from 1 January 2026 (included) up to v1.3.0 |
| `2026-01-01..2026-03-31` | what entered the branch in the first quarter |
| `v1.2.0..abc1234`, `2026-01-01..abc1234` | up to that commit |
| `abc1234..v1.3.0`, `abc1234..2026-03-31`, `abc1234..def5678` | after that commit |
| `v1.3.0..` / `..v1.0.0` | up to the latest change / from the first commit |

The start is excluded and the end is included; dates refer to when a change entered the main
branch, in the local time zone. To choose the ends, the mergecat tags skill (`/mergecat:tags` in Claude
Code) lists the tags.

## Steps

1. Run the compliance confirmation above (once per session).
2. Call `repository_info` to learn the default branch, the version tags and whether pull request
   data is available.
3. If `CHANGELOG.md` exists at the repository root, read it (read only) and note the newest
   version heading and its language.
4. Call `changelog` with `language` (see "Language") and:
   - a range: `range` as written by the user. On an error (unknown end, invalid date, nothing
     before a date), explain it in one line and suggest valid ends from `tags`; do not guess.
     Read `range.from.resolvedAs`, `range.to.resolvedAs` and every entry in `notes` (for example
     swapped ends or an empty range);
   - `all`: `max_releases` 20 and `header: true`;
   - empty arguments or a version: `unreleased_only: true`; but when `CHANGELOG.md` exists and its
     newest version is older than the newest version tag, `range` = `<tag of that version>..`, so
     that the releases missing from the file are included too.
5. Edit the draft:
   - one line per user-visible change, written for users, in the language of the changelog; keep
     pull request links and issue references;
   - when a line is vague (a branch name, "Merge branch …"), read the item's `commits` in the data
     and describe the change from them; use `changesets` or `where_entered` if you need more;
   - keep **BREAKING** markers and put breaking changes first in their section;
   - leave out internal items (docs, tests, CI, chores) unless they matter to users or the user
     asked for everything;
   - fix the section when the `reason` given in the data is clearly wrong;
   - merge duplicates (a fix and its follow-up fix are one line).
6. Build the document:
   - a range: start with `# Changelog <from> → <to>` (the title in the language of the changelog)
     and one line with the repository, the branch, the number of changes and how each end was
     resolved; then the release section (the version as heading when the range ends at a version
     tag, otherwise the range itself);
   - otherwise: the new or changed release sections (all of them for `all`, with the Keep a
     Changelog header);
   - add the compare links at the bottom when the data has `compareUrl`.
7. Deliver it:
   - **always** as a document of the conversation, in the requested format (Markdown by default,
     PDF on request), as described below;
   - **only when the user asked to update the file:** also update `CHANGELOG.md` in the project.
     Keep every existing release section exactly as it is, fill `## [Unreleased]` (or add the new
     version heading under it, followed by an empty `## [Unreleased]`), update the link references
     at the bottom, and create the file with the Keep a Changelog header if it does not exist.
     A range that is not a release (ends at a date or a commit) does not go into `CHANGELOG.md`:
     say so and deliver only the document.
8. Reply with a short summary: the release(s) or the range and how each end was resolved, the
   language and format, the number of changes per section, and anything that needs a decision
   (unclear section, change without a pull request, breaking change, swapped ends).

## Deliver a document

Changelogs and compliance records are documents of this conversation, not files of the project.

1. Markdown: write it to a temporary file **outside the repository**: the session scratchpad
   directory if you have one, otherwise the system temporary folder (`$TMPDIR` or `/tmp` on macOS
   and Linux, `%TEMP%` on Windows). Name it as given above (for a changelog
   `changelog-<repository>-<version or range>.md`), replacing characters other than letters,
   digits, `.`, `_` and `-` with `-`. PDF: `render_pdf` already wrote the file.
2. Make it available in the chat so that the user can open and download it:
   - Markdown with the `Artifact` tool, if you have it: publish that file as a **Markdown (.md)
     artifact** (this skill explicitly asks for a Markdown artifact), with a one-sentence
     description;
   - a PDF (or Markdown without the `Artifact` tool) with a tool that sends a file to the user, if
     you have one (for example `SendUserFile`);
   - with neither: Markdown as one fenced `markdown` block in the reply, a PDF as its path.

## Rules

- Never invent a change that is not in the tool output.
- Never answer the compliance questions for the user, and never call `record_compliance_answer`
  without the user's answers from this conversation.
- Never write files in the project unless the user asked to update `CHANGELOG.md` (or to save the
  PDF there: then `render_pdf` with `allow_in_project: true`).
- Never create tags, commits or pushes, and never run Git commands that modify the repository,
  unless the user asks for it.
- If the tools report local Git data only, say in one line that pull request titles and approvals
  need a token of the hosting service (`GITHUB_TOKEN`, `GITLAB_TOKEN` or `AZURE_DEVOPS_EXT_PAT`; the
  tool notes name the right one). If they report that the history has no merge commits
  or uses squash merges, say that the grouping relies on commit messages.
