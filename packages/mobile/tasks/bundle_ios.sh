#!/bin/sh -e

set -x

PROJECT_ROOT="../../.."
DEST=$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH
BUNDLE_FILE="$DEST/main.jsbundle"
SOURCEMAP_FILE="$PROJECT_ROOT/.builds/ios.bundle.map"
ENTRY_FILE="packages/mobile/index.js"

echo "🚧 Building JS bundle..."

NODE_ENV=production

$PROJECT_ROOT/node_modules/react-native/cli.js \
  ram-bundle \
  --platform ios \
  --dev false \
  --reset-cache \
  --entry-file $ENTRY_FILE \
  --bundle-output $BUNDLE_FILE \
  --assets-dest $DEST \
  --verbose \
  --sourcemap-output $SOURCEMAP_FILE \
  $EXTRA_PACKAGER_ARGS

echo "🗄 Copy bundle for bundle size..."
cp $BUNDLE_FILE $PROJECT_ROOT/.builds

echo "✅ Bundle saved in $DEST"
echo "✅ Sourcemap saved $SOURCEMAP_FILE"