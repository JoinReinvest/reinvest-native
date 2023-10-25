#!/bin/zsh

# extend with additional commands
variables=$ENV_FILE

base64 -d <<< $ENV_FILE > ../../.env

echo "===> ENV FILE CREATED"

