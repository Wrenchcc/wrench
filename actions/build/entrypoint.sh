#!/bin/sh

set -e

sh -c "yarn $* && cd api && yarn && cd .."
