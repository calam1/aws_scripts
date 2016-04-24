#!/usr/bin/env bash
# usage: pass the group name and policy arn respectively as arguments i.e. ./delete_group_policy.sh admin arn:aws:iam::aws:policy/AdministratorAccess
GROUP=$1
POLICY_ARN=$2
echo "Deleting group policy - ${POLICY_ARN} for group ${GROUP}"
aws iam detach-group-policy --group-name ${GROUP} --policy-arn ${POLICY_ARN}
echo "Listing all group policies remaining for group ${GROUP}"
aws iam list-attached-group-policies --group-name ${GROUP}
