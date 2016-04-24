#!/usr/bin/env bash
GROUP="$1"
echo "Getting users for group ${GROUP}"
aws iam get-group --group-name ${GROUP}
