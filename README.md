# DSNOW React App Deployment Guide

This repository contains a React application for the DSNOW presentation. This guide will help you deploy the app to GitHub Pages.

## Deployment Process

There are two main scripts to help with deployment:

1. `deploy-github-pages.sh` - Builds the React app and prepares the files for deployment
2. `push-changes.sh` - Commits and pushes the changes to GitHub

### Step 1: Build and Prepare for Deployment

Run the following command to build the React app and prepare the files for deployment:

```bash
./deploy-github-pages.sh
```

This script will:
- Install dependencies
- Build the React app
- Copy the build files to the `docs` directory
- Create necessary files for GitHub Pages and client-side routing

### Step 2: Commit and Push Changes

After preparing the files, run the following command to commit and push the changes to GitHub:

```bash
./push-changes.sh
```

This script will:
- Add the `docs` directory to git
- Commit the changes
- Push the changes to GitHub

### Step 3: Configure GitHub Pages

After pushing the changes, make sure GitHub Pages is configured correctly:

1. Go to your repository on GitHub: https://github.com/jonx0037/ds6306_dsnow_unit-10
2. Click on 'Settings' (tab at the top)
3. In the left sidebar, click on 'Pages'
4. Under 'Source', select 'GitHub Actions'

Your app should be available at: https://jonx0037.github.io/ds6306_dsnow_unit-10/

## Troubleshooting

If you're having issues with the deployment, check the following:

1. Make sure the `homepage` field in `package.json` is set to `https://jonx0037.github.io/ds6306_dsnow_unit-10/`
2. Check the GitHub Actions workflow status at: https://github.com/jonx0037/ds6306_dsnow_unit-10/actions
3. Make sure the GitHub Pages source is set to 'GitHub Actions'
4. Check if there are any errors in the GitHub Actions workflow logs

## Development

To run the app locally, navigate to the `dsnow-app` directory and run:

```bash
npm install
npm start
```

This will start the development server at http://localhost:3000/