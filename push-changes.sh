#!/bin/bash

# Exit on error
set -e

echo "===== Pushing Changes to GitHub ====="
echo ""

# Add the docs directory to git
echo "Adding docs directory to git..."
git add -f docs/

# Commit the changes
echo "Committing changes..."
git commit -m "Deploy React app to GitHub Pages"

# Push the changes to GitHub
echo "Pushing changes to GitHub..."
git push origin main

echo ""
echo "Changes pushed to GitHub!"
echo "Check the GitHub Actions workflow status at:"
echo "https://github.com/jonx0037/ds6306_dsnow_unit-10/actions"
echo ""
echo "Make sure GitHub Pages is configured correctly:"
echo "1. Go to https://github.com/jonx0037/ds6306_dsnow_unit-10/settings/pages"
echo "2. Under 'Source', select 'GitHub Actions'"
echo ""
echo "Your app should be available at: https://jonx0037.github.io/ds6306_dsnow_unit-10/"