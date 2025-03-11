#!/bin/bash

# Exit on error
set -e

echo "This script will help you push the changes to GitHub."
echo "Make sure you have git configured with your GitHub credentials."
echo ""

# Check if there are any changes in the docs directory
if git diff --quiet docs/; then
  echo "No changes detected in the docs directory."
  echo "The app may already be deployed correctly."
else
  echo "Changes detected in the docs directory."
fi

echo ""
echo "To manually push the changes to GitHub, follow these steps:"
echo ""
echo "1. Add the docs directory to git:"
echo "   git add -f docs/"
echo ""
echo "2. Commit the changes:"
echo "   git commit -m \"Deploy React app to GitHub Pages\""
echo ""
echo "3. Push the changes to GitHub:"
echo "   git push origin main"
echo ""
echo "After pushing, your app should be available at: https://jonx0037.github.io/ds6306_dsnow_unit-10/"
echo ""
echo "If you're still having issues, check the GitHub Pages settings in your repository:"
echo "1. Go to https://github.com/jonx0037/ds6306_dsnow_unit-10/settings/pages"
echo "2. Make sure the 'Source' is set to 'Deploy from a branch'"
echo "3. Make sure the 'Branch' is set to 'main' and the folder is set to '/docs'"
echo "4. Click 'Save'"
echo ""
echo "You can also try to manually upload the files to GitHub using the web interface:"
echo "1. Go to https://github.com/jonx0037/ds6306_dsnow_unit-10"
echo "2. Navigate to the docs directory"
echo "3. Click 'Add file' > 'Upload files'"
echo "4. Upload all the files from your local docs directory"
echo "5. Commit the changes"