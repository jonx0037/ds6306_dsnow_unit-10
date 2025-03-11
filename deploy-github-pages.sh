#!/bin/bash

# Exit on error
set -e

echo "===== DSNOW React App GitHub Pages Deployment ====="
echo ""

# Navigate to the React app directory
cd "$(dirname "$0")/dsnow-app"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the React app
echo "Building the React app..."
npm run build

# Clear the docs directory in the root of the repository
echo "Clearing the docs directory..."
rm -rf ../docs
mkdir -p ../docs

# Copy build files to the docs directory
echo "Copying build files to docs directory..."
cp -r build/* ../docs/

# Create .nojekyll file to prevent Jekyll processing
echo "Creating .nojekyll file..."
touch ../docs/.nojekyll

# Create 404.html for client-side routing
echo "Creating 404.html for client-side routing..."
cat > ../docs/404.html << 'EOL'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>DSNOW Presentation</title>
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    var pathSegmentsToKeep = 1;

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
</body>
</html>
EOL

# Update index.html for client-side routing
echo "Updating index.html for client-side routing..."
sed -i.bak '/<head>/a \
  <!-- Start Single Page Apps for GitHub Pages --> \
  <script type="text/javascript"> \
    // Single Page Apps for GitHub Pages \
    // MIT License \
    // https://github.com/rafgraph/spa-github-pages \
    (function(l) { \
      if (l.search[1] === "/" ) { \
        var decoded = l.search.slice(1).split("&").map(function(s) {  \
          return s.replace(/~and~/g, "&") \
        }).join("?"); \
        window.history.replaceState(null, null, \
            l.pathname.slice(0, -1) + decoded + l.hash \
        ); \
      } \
    }(window.location)) \
  </script> \
  <!-- End Single Page Apps for GitHub Pages -->' ../docs/index.html
rm -f ../docs/index.html.bak

# Commit and push changes
echo ""
echo "Deployment preparation complete!"
echo ""
echo "To complete the deployment, you need to commit and push the changes to GitHub:"
echo ""
echo "  git add -f docs/"
echo "  git commit -m \"Deploy React app to GitHub Pages\""
echo "  git push origin main"
echo ""
echo "After pushing, check the GitHub Actions workflow status at:"
echo "https://github.com/jonx0037/ds6306_dsnow_unit-10/actions"
echo ""
echo "Make sure GitHub Pages is configured correctly:"
echo "1. Go to https://github.com/jonx0037/ds6306_dsnow_unit-10/settings/pages"
echo "2. Under 'Source', select 'GitHub Actions'"
echo ""
echo "Your app should be available at: https://jonx0037.github.io/ds6306_dsnow_unit-10/"