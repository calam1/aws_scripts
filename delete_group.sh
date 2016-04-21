#!/usr/bin/env bash
aws iam list-groups
GROUP=$1
echo "Deleting group - ${GROUP}"
aws iam delete-group --group-name ${GROUP}
aws iam list-groups
