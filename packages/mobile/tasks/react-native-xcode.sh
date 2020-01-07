#!/bin/sh -e

set -x

DEST=$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH
BUNDLE_FILE="$DEST/main.jsbundle"
ENTRY_FILE="packages/mobile/index.js"

echo "🚧 Building JS bundle..."

NODE_ENV=production

../../../node_modules/react-native/cli.js \
  ram-bundle \
  --platform ios \
  --dev false \
  --reset-cache \
  --entry-file $ENTRY_FILE \
  --bundle-output $BUNDLE_FILE \
  --assets-dest $DEST \
  --verbose \
  $EXTRA_PACKAGER_ARGS

echo "✅ Bundle saved in $OUTPUT_DIR"