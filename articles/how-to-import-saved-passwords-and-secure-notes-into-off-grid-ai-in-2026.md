---
layout: content
title: "How to Import Saved Passwords and Secure Notes Into Off Grid AI in 2026"
description: "Import supported login and secure-note CSV records into a local desktop Vault and check the result before retiring the old copy."
date: "2026-10-13"
permalink: /articles/how-to-import-saved-passwords-and-secure-notes-into-off-grid-ai-in-2026/
published_at: "2026-10-13T09:06:44Z"
article_topic: "Privacy & control"
article_platform: "Computer"
devto_article: true
devto_id: 4843049
devto_url: "https://dev.to/alichherawalla/how-to-import-saved-passwords-and-secure-notes-into-off-grid-ai-in-2026-5d5m"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto/https%3A%2F%2Fgetoffgridai.co%2Fassets%2Fimg%2Fhome%2Fapp%2Fvault-open-light-1760.webp"
---
Moving a password collection should leave you with records you can check, not just an “import complete” message. OGAD (Off Grid AI Desktop) can import supported login and secure-note records from a LastPass-format CSV through its paired browser extension.

The import goes into the local Pro Vault. Keep the source collection until you have checked the import counts and tested the accounts you depend on. The extension does not accept every password-manager export format.

[Download OGAD](https://getoffgridai.co/desktop/) | [Desktop beta 122 release notes](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122)

![Off Grid AI Desktop Vault showing a sample saved login](https://getoffgridai.co/assets/img/home/app/vault-open-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-494gbuv5c-kj9tT7U0AS8Kq8UUO63_jw), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Which file can you import?

The browser Vault's **Import and export** screen has an **Import from LastPass** option. It reads a CSV export in the supported format. Renaming a different file to `.csv` does not make its columns compatible.

The browser import has a file-size limit of about 500 KB. Supported login and secure-note rows can become Vault entries. Other rows can be skipped, so the number of items in the source service is not necessarily the number that will be imported.

A CSV password export can contain readable secrets. Keep it out of email, chat prompts, shared folders, and source-control repositories. You do not need an AI model to inspect or import the file.

## Prepare the destination before exporting

Install [OGAD](https://getoffgridai.co/desktop/), set up its Pro Vault, and pair the [browser extension](https://getoffgridai.co/browser-extension/) with that desktop. Unlock the Vault and confirm that the extension can open it.

Choose the intended computer before you begin. Importing into one desktop is not a migration into every other device. Keep the Vault recovery information available outside the computer you are moving from.

Make a small checklist of accounts you need immediately: primary email, one work service, and any account with recovery information stored in a secure note. The purpose is to test coverage, not to copy their passwords into another document.

## Run the import

1. Export the supported CSV from the source password manager using its own export controls.
2. In the paired browser Vault, open **Import and export**.
3. Under **Import from LastPass**, choose **Choose CSV**.
4. Select the export file from its local location.
5. Wait for the result and read both the imported and skipped counts.
6. Open several imported entries before you remove any source data.

Leave the desktop app running and the Vault unlocked while the import runs. A browser connection failure is not proof that nothing was saved. Inspect the destination before you retry a file after an uncertain result.

## Understand skipped records

The importer can skip duplicates, rows with missing credentials, empty rows, invalid items, and malformed rows. A skipped count is information to review, not a reason to assume the whole migration failed.

| Result | Likely next check |
| --- | --- |
| Duplicate row | Compare the existing destination item with the source |
| Missing credentials | Check whether the row is a supported login or a note |
| Empty or malformed row | Check the export itself in a suitable local tool |
| Unsupported item | Keep it in the source until you have a supported destination |

Do not repeatedly import the same file just to make the count larger. A duplicate may already be present. If you split a large export, retain the expected CSV header in each file and protect every part as carefully as the original.

## Check logins and notes separately

For a login, inspect its website, username, and saved password. Test sign-in through the real website. Multiple accounts at one service deserve separate checks because a plausible title can still belong to the wrong username.

For a secure note, open the note and check that its text is complete. Use a record you recognize. Check line breaks and any instructions you need to follow later, such as an account-recovery process. Do not test recovery codes by spending them unless that is your intended action.

A useful migration sample includes both record types, one long note, and one service with multiple accounts. If any sample is wrong, stop the cleanup and investigate that group of records before you rely on the destination.

## Make an encrypted backup of the new Vault

The extension's export guidance points you to OGAD. Export from the desktop Vault to save an encrypted KDBX file. That is different from the readable CSV used for this import.

Keep a backup you can identify by date and destination. Do not assume that downloading a file proves you can later open it. Follow the Vault's recovery and backup procedure while you still have access to the original computer.

After you have checked the destination and a suitable backup, remove temporary readable exports from the places where you created them. Remember any split copies you made for the import. Keep the original account collection until your own migration checks are complete.

## Fix the common failures

If **Choose CSV** rejects the file, check its format and size first. If the Vault cannot be reached, check the paired desktop and its lock state. If the imported count is unexpectedly low, compare the skip reasons with the source item types instead of guessing that all rows were passwords.

Start with a controlled move: [open OGAD](https://getoffgridai.co/desktop/), prepare the local Vault, import one supported export, and verify the accounts and notes you need before you retire the source.
