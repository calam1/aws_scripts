#!/usr/bin/env bash
# usage: pass the group name as an arguments i.e. ./delete_group.sh admin
aws iam list-groups
GROUP=$1
echo "Deleting group - ${GROUP}"
aws iam delete-group --group-name ${GROUP}
echo "Listing groups after deleting ${GROUP}"
aws iam list-groups
