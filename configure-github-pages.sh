#!/bin/bash

echo "GitHub Pages Configuration Guide"
echo "================================"
echo ""
echo "We've added a GitHub Actions workflow to automatically deploy your app to GitHub Pages."
echo "Here's what you need to do to configure GitHub Pages:"
echo ""
echo "1. Go to your repository on GitHub: https://github.com/jonx0037/ds6306_dsnow_unit-10"
echo "2. Click on 'Settings' (tab at the top)"
echo "3. In the left sidebar, click on 'Pages'"
echo "4. Under 'Source', select 'GitHub Actions'"
echo ""
echo "The workflow will automatically deploy your app to GitHub Pages whenever you push to the main branch."
echo "It may take a few minutes for the changes to take effect."
echo ""
echo "If you're still having issues, you can try the following:"
echo ""
echo "1. Check the GitHub Actions workflow status:"
echo "   - Go to your repository on GitHub"
echo "   - Click on 'Actions' (tab at the top)"
echo "   - Look for the latest workflow run and check if it completed successfully"
echo ""
echo "2. Make sure your docs folder contains all the necessary files:"
echo "   - index.html"
echo "   - 404.html"
echo "   - .nojekyll"
echo "   - All the static assets (CSS, JS, images, etc.)"
echo ""
echo "3. If you're using client-side routing (like React Router), make sure you have the proper configuration:"
echo "   - 404.html file with the redirect script"
echo "   - index.html with the script to handle the redirect"
echo ""
echo "4. Check for any error messages in the GitHub Actions workflow logs"
echo ""
echo "After making these changes, your site should be available at: https://jonx0037.github.io/ds6306_dsnow_unit-10/"