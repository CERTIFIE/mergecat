---
name: tags
description: List the Git tags of the repository with date, commit, message, whether they are on the main branch and how many changes each release contains, using the mergecat MCP tools. Asks the compliance question (EU AI Act, NIS2) once per session first. Use when the user asks for the tags, the releases or the versions of the repository, or needs to choose a range for a changelog.
argument-hint: "[filter, e.g. v2.* | versions]"
allowed-tools: mcp__plugin_mergecat_mergecat__compliance_status mcp__plugin_mergecat_mergecat__record_compliance_answer mcp__plugin_mergecat_mergecat__tags mcp__plugin_mergecat_mergecat__repository_info AskUserQuestion
---

# Tags of the repository

Arguments: `$ARGUMENTS` (if this shows the placeholder itself, your client does not fill it in:
take the arguments from the user's request).
- empty: all tags, newest first;
- `versions`: only tags that look like versions;
- anything else: a filter on the tag name (text, or a glob such as `v2.*`).

## Compliance confirmation (once per session)

mergecat sends data of the repository to the AI service of this conversation (`compliance_status`
names it in `aiService`). Before the first mergecat repository tool of the session:

1. Call `compliance_status`. If `confirmed` is true, skip this section.
2. Ask the user the question in `questions.account`, translated into the language of the
   conversation, as a yes/no question: with a tool that asks the user a question with options if
   you have one (for example `AskUserQuestion`, options "Yes" and "No"), otherwise in your reply,
   then wait. Never answer for the user and call no other mergecat
   tool before the answer.
3. - **Yes** → `record_compliance_answer` with `team_or_enterprise_account: true`.
   - **No** → ask `questions.proceedIfNotTeamOrEnterprise` the same way (aware of the EU AI Act and
     NIS2, proceed anyway?), then `record_compliance_answer` with
     `team_or_enterprise_account: false` and `aware_and_proceed` = that answer.

   Always pass `requested_action` (e.g. `tags v2.*`), `answers_verbatim`, `language` and
   `ai_model`.
4. Give the returned compliance record (Markdown) to the user as a **document of the
   conversation**: write it to a temporary file outside the repository (your scratchpad directory,
   else the system temporary folder) named `compliance-record-<repository>-<YYYY-MM-DD>.md`, and
   publish it as a Markdown (.md) artifact with the `Artifact` tool if you have it, else send it
   with a tool that sends files (e.g. `SendUserFile`), else put it in the reply as a fenced
   `markdown` block. Say in one line where the record is stored on this computer.
5. Outcome `proceed` → continue. Outcome `stopped` → stop: say in one line that mergecat read no
   repository data; call no other mergecat tool.

If a mergecat tool answers that the compliance confirmation is required, run this section first.

## Steps

1. Run the compliance confirmation above (once per session).
2. Call `tags` with `pattern` (the filter, if any), `versions_only: true` for `versions`, and
   `limit` 50.
3. Reply with a table, newest first:

   | Tag | Date | Commit | On `<branch>` | Changes since previous | Message |

   - "Changes since previous" is `changesetsSincePrevious` with the previous version tag in
     parentheses (only for version tags on the branch; leave it empty otherwise);
   - mark tags that are not on the branch (hotfix or release branches) and lightweight tags
     (no message, no tagger) in a short note under the table, not in every row.
4. Under the table: how many changesets are not released yet (`unreleasedChangesets` since
   `newestVersionTag`), then two or three ready-to-use commands for the most likely ranges, e.g.
   `/mergecat:changelog v1.2.0..v1.3.0` (the newest release) and
   `/mergecat:changelog v1.3.0..` (what is not released yet); outside Claude Code, write them as a
   request for the mergecat changelog skill (e.g. "changelog v1.2.0..v1.3.0"). Remind in one line that each end
   of a range can also be a date (YYYY-MM-DD) or a commit, and that `pdf` and `lang:<code>`
   (e.g. `lang:it`) give a PDF or another language.

## Rules

- The tag list is an answer in the conversation: do not write files (the compliance record is the
  only document, and it goes outside the repository).
- Never answer the compliance questions for the user.
- Never create, move, delete or push tags unless the user asks for it.
