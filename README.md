# DDA-web
Saytın redesign

## Deployment

This project is configured to deploy to GitHub Pages using **GitHub Actions**.

### How it works
Every time changes are pushed to the `main` branch, a GitHub Action workflow builds the React app and uploads the `dist` artifact to GitHub Pages.

### Setup Instructions (Required)
1. Go to your repository **Settings**.
2. Navigate to the **Pages** section (on the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**.
   - (The Branch selector will disappear, which is correct).
4. Go to **Actions** -> **General** (sidebar).
   - Scroll to **Workflow permissions**.
   - Select **Read and write permissions**.
   - Click **Save**.

The site will automatically deploy after your next push to `main`.

### Local Verification
To verify the build locally:
```bash
npm install
npm run build
# Check that dist/index.html uses relative paths (e.g., /DDA-web/assets/...)
```

### Local Development
To run the project locally:
```bash
npm install
npm run dev
```
