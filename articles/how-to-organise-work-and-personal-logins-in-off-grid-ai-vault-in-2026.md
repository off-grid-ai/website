---
layout: content
title: "How to Organise Work and Personal Logins in Off Grid AI Vault in 2026"
description: "Organise local Vault logins with folders, favorites and multiple website URLs. Check the right account before browser autofill."
date: "2026-10-13"
permalink: /articles/how-to-organise-work-and-personal-logins-in-off-grid-ai-vault-in-2026/
published_at: "2026-10-13T10:22:44Z"
article_topic: "Privacy & control"
article_platform: "Computer"
devto_article: true
devto_id: 4843732
devto_url: "https://dev.to/alichherawalla/how-to-organise-work-and-personal-logins-in-off-grid-ai-vault-in-2026-3nb0"
image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto/https%3A%2F%2Fgetoffgridai.co%2Fassets%2Fimg%2Fhome%2Fapp%2Fvault-open-light-1760.webp"
---
Two accounts at the same website are easy to confuse. A login called "Portal" tells you little when one account is for work and the other is personal. OGAD (Off Grid AI Desktop) Pro lets you give Vault entries clear titles, place them in folders, mark favorites, and store several website URLs for one login.

Start with a few accounts you use each week. You can find the right entry on the computer and choose it from the paired browser extension without moving your password collection into a cloud password account.

[Get OGAD](https://getoffgridai.co/desktop/) | [Desktop beta 122](https://github.com/off-grid-ai/OGAD/releases/tag/v0.0.55-beta.122)

![Example Off Grid AI Desktop Vault with a selected website login. Folder and URL controls appear when you edit an entry.](https://getoffgridai.co/assets/img/home/app/vault-open-light-1760.webp)

---

> **What would you like to do with Off Grid AI?**
>
> Have a feature or use case you would like us to support? Tell us what you want to do and which device you use.
>
> Write to [support@getoffgridai.co](mailto:support@getoffgridai.co), [join our Slack community](https://join.slack.com/t/off-grid-mobile/shared_invite/zt-494gbuv5c-kj9tT7U0AS8Kq8UUO63_jw), or [talk to us on Reddit](https://www.reddit.com/r/off_grid_ai/).

## Prepare the Vault before sorting it

Use desktop beta 122 with Pro active. Open **Vault** and unlock it. If this is your first use, complete Vault setup and keep its recovery information somewhere you can access if the computer is unavailable. For browser autofill, use the early-access extension paired with this Desktop and keep Vault unlocked.

These organization controls do not need a chat model. You are editing saved records, not asking AI to inspect passwords. Do not paste passwords, recovery phrases, or exported password files into a chat to sort them.

The illustration above shows an example login. Your entry names and available fields will depend on your saved items and installed version. The procedure below uses the beta's edit form.

## Give each account a useful title

Suppose you have a work account and a personal account at the same design service, plus a client portal. Use titles such as "Design service - work," "Design service - personal," and "Northwind portal - project account."

The title should identify the purpose. Keep the actual account identity in **Username / Email**. A clear title helps you choose, but it does not change which account the password belongs to.

1. Select a login in Vault.
2. Choose **Edit**.
3. Check **Title**, username, and the saved website address.
4. Change the title to identify the account's purpose.
5. Select **Save**, then reopen the entry to check it.

Do one entry first. If it is correct, repeat the same naming rule for the related accounts. Renaming a Vault entry does not rename your account at the service.

## Put related entries in a folder

The edit form has a **Folder** field. Type a useful folder name or choose an existing suggestion. For example, use `Work/Email`, `Work/Client portals`, and `Personal`. Keep the set small enough that you can choose a folder without thinking about a complex filing system.

Save the entry, then use **Folder filter** above the list to choose that folder. **All folders** restores the full list. **No folder** helps find entries that have not been assigned yet.

A folder is an organization label. It does not create a second encrypted Vault, a different unlock secret, or separate permissions for a colleague. Only place accounts in this Vault when they belong in your intended local password collection.

If a login seems to disappear after editing, check the folder filter and search text before recreating it. An active filter can hide a valid entry. Clearing the filter is safer than making a duplicate with another password.

## Mark the few logins you use most

Open the entry's edit form and enable **Favorite**, then Save. Favorites are placed ahead of other entries in the relevant list. Use this for the accounts you open frequently rather than marking every entry.

For a normal workday, you might favor your work email and current client portal while leaving occasional accounts in their folders. The folder answers "Which group?" The favorite answers "Which do I use most?"

Remove the favorite mark when a project ends. That keeps the top of the list useful without deleting a login you still need for records or occasional access.

## Add another website address to the same login

Some accounts use more than one legitimate sign-in address. In the edit form, check **Primary URL**, then choose **Add URL** for each additional address. Save the entry and review the grouped websites in its detail view.

Only add an address where those same credentials are valid. A second account with a different username or password needs its own login entry, even if both accounts use the same website. Adding a URL is not a way to grant that account access to a new service.

| Situation | Useful record choice |
| --- | --- |
| Same account and password, another valid sign-in address | Add a URL to the existing login |
| Work and personal accounts on one website | Keep separate login entries |
| Old address no longer used | Remove that URL after checking the replacement |
| Another project uses a different account | Create or retain its separate entry |

Check the actual address in the browser before filling. A similar-looking page title does not establish that the page is the service you intended.

## Choose the right login in the browser

Open the service's normal sign-in page in the paired browser. Use the key control in the field or open the matching Vault entry in the panel. When several saved logins match the site, select the intended account. Check the filled username before submitting the form.

The extension can also offer to save a login you typed when Desktop confirms that it is not already saved. Complete the sign-in normally, review any save offer, and inspect the resulting record. A multi-page form can make the username less obvious, so check that field rather than trusting the title alone.

If no entry appears, confirm that OGAD is running, the pair is connected, and Vault is unlocked. Then check the saved URLs. The website still receives the credentials you submit to it; local Vault storage does not remove the website from the sign-in process.

## Review imported entries in small groups

After [importing passwords and notes](https://dev.to/alichherawalla/how-to-import-saved-passwords-and-secure-notes-into-off-grid-ai-in-2026-5d5m), start with one folder's worth of accounts. Check the title, username, URLs, and any notes. Test an important login before removing its old source record. Keep exported CSV files out of shared folders because they can contain readable secrets.

Use **No folder** to find unsorted entries, assign a folder, then mark only the frequent ones as favorites. Do not merge entries just because their titles match. Two imported records can refer to different accounts or contain different current passwords.

You can keep login organization separate from password quality. Use [Vault's password audit](https://dev.to/alichherawalla/how-to-find-weak-and-reused-passwords-in-your-off-grid-ai-vault-in-2026-e1l) for weak or reused passwords, and change a password at the actual website before updating the saved value. Editing a stored password alone does not change the website's password.

## Organise the accounts you will use tomorrow

[Open OGAD](https://getoffgridai.co/desktop/) and choose a small group of work and personal logins. Give each a clear title, assign its folder, and check one browser sign-in. Once that group is correct, apply the same simple rules to the rest of your Vault.
