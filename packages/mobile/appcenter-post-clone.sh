#!/usr/bin/env bash

set -ex

brew uninstall node@6
NODE_VERSION="12.13.0"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"

# run yarn twice, ignoring errors from the first one
# https://github.com/yarnpkg/yarn/issues/6988
yarn --cwd ../../ install || true
yarn --cwd ../../ install 