# DDA-web
Saytın redesign

## Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### How it works
Every time changes are pushed to the `main` branch, a GitHub Action workflow runs `npm install`, `npm run build`, and deploys the contents of the `dist/` directory to the `gh-pages` branch.

### Setup Instructions
1. Go to your repository **Settings**.
2. Navigate to the **Pages** section (on the left sidebar).
3. Under **Build and deployment**:
   - Source: Select **Deploy from a branch**.
   - Branch: Select **gh-pages** and ensure the folder is **/(root)**.
   - Click **Save**.

The site should now be live at your GitHub Pages URL (e.g., `https://username.github.io/DDA-web/`).

### Local Development
To run the project locally:
```bash
npm install
npm run dev
```
