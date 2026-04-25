---
name: deploy-changes
description: Deploy code changes by pushing to GitHub and running make release and make deploy. Use when the user wants to deploy their project, release a new version, push and deploy changes, or run the deployment pipeline.
---

# Deploy Changes

This skill handles the standard deploy workflow for this project.

## Workflow

Execute these steps in order:

1. **Push changes to GitHub**
   ```bash
   git push
   ```

2. **Run release build**
   ```bash
   make release
   ```

3. **Run deploy**
   ```bash
   make deploy
   ```

## Requirements

- `git` — required for pushing changes to GitHub
- `make` — required for running `make release` and `make deploy`

## Notes

- If `git push` fails due to uncommitted changes, commit them first (only if explicitly requested).
- If either `make` command fails, stop and report the error. Do not proceed to the next step.
- Wait for each command to complete before running the next.
