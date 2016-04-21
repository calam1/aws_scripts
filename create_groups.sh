#!/usr/bin/env bash
# usage: pass the group name as an arguments i.e. ./create_group.sh admin
GROUP=$1
echo "Creating new group called - ${GROUP}"
aws iam create-group --group-name ${GROUP}
echo "Listing grouops after creating group ${GROUP}"
aws iam list-groups