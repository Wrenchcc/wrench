#!/usr/bin/env bash

set -ex
brew uninstall node@6
NODE_VERSION="10.9.0"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"

# echo "Install librsvg"
# HOMEBREW_NO_AUTO_UPDATE=1 brew install librsvg
# export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig
