# Publish this portfolio with GitHub Pages

## Your future website

- GitHub username: `kervino`
- **Repository name (exact): `kervino.github.io`**
- Website URL *after publication*: `https://kervino.github.io/`
- Repo URL *after creation*: `https://github.com/kervino/kervino.github.io`

This is a plain HTML/CSS/JavaScript site. It has no build step. `index.html` belongs at the root of the repository, **not** inside another `kervin-portfolio` directory. The `.nojekyll` file is intentional.

## Step 0 — Check before publishing

This website is public when you enable GitHub Pages. Verify that the project summaries describe work you actually did, and make sure you are allowed to publicly describe the team project. The graphics case study is marked as a draft and the cybersecurity card is marked as planned. Do not upload private source code, unreleased team artifacts, secrets, student IDs or coursework that is not permitted to be shared.

## Method A: GitHub website (no command line required)

1. Sign in at https://github.com/new .
2. Under your account `kervino`, name the new repository exactly **`kervino.github.io`**.
3. Set visibility to **Public**. Choose **Add a README** so that the repository starts with a `main` branch; then create it.
4. Open the repository, select **Add file → Upload files**. From the extracted `kervino.github.io` folder, upload all of the *contents* — including `index.html`, `styles.css`, `script.js`, the `projects` and `assets` directories, `.nojekyll`, and the markdown files. GitHub's upload UI can accept dragged files/folders in supported browsers. If folders cannot be uploaded from your browser, use Method B instead.
5. Commit the upload to the `main` branch.
6. Navigate to **Settings → Pages** in the repository. Under **Build and deployment**, select **Deploy from a branch** and set the branch to `main`, folder to `/(root)`; click **Save**.
7. After GitHub finishes publishing, open `https://kervino.github.io/`. GitHub's **Settings → Pages** area should also show the live URL and publishing status. Publication can take a few minutes.

## Method B: Git command line (reliable for folders)

Create the repository on https://github.com/new first, with exact name `kervino.github.io`, **Public**, and *without* initializing it with a README (the files here already include one).

Open a terminal in the extracted `kervino.github.io` folder and run:

```bash
git init -b main
git add .
git commit -m "Add personal portfolio website"
git remote add origin https://github.com/kervino/kervino.github.io.git
git push -u origin main
```

Sign in to GitHub via the prompt if asked. **Never paste an account password or token into a chat.** Then set **Settings → Pages → Deploy from a branch → main → /(root) → Save** as described above.

If Git says your name/email are not configured, run `git config --global user.name "Your Name"` and `git config --global user.email "your-github-commit-email"` locally, then retry the commit. Consider a GitHub-provided noreply address if you'd prefer not to expose your private email in public commits.

## Future updates

Edit the relevant HTML/CSS/JavaScript files and commit/push changes to `main` (or use **Edit file** on GitHub). GitHub Pages republishes the changes. In `script.js`, set `PROFILE.resume` only after adding a public PDF under `assets/`. Project source-code links should be added when the associated repositories are public and the code can be shared.

## If it does not appear

- Check that you created **`kervino.github.io`** under the `kervino` account.
- Check that `index.html` is at the repository root.
- Confirm **Settings → Pages** is set to branch `main`, directory `/(root)`.
- Check **Actions** or **Settings → Pages** for the build/deployment result.
- Check for capitalisation/typos and try loading the site again after the deployment completes.

GitHub official docs: https://docs.github.com/en/pages/quickstart and https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
