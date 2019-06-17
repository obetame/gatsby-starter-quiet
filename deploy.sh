#!/usr/bin/env sh

# Run this script to deploy the app to server.

# Exit if any subcommand fails.
set -e

echo "Start build..."

yarn build

echo "Start upload..."

echo "Please add server username,ip,path info..."
# rsync -avzP ./public/ user@ip:path
# rsync -avzP ./public/ user@123.123.123.123:/static/

echo "Upload success!"

exit 0
