#!/usr/bin/env bash
GROUP=$1
echo "Creating new group called - ${GROUP}"
aws iam create-group --group-name ${GROUP}
aws iam list-groups