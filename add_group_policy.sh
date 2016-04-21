#!/usr/bin/env bash
# usage: pass the group name and policy arn respectively as arguments i.e. ./add_group_policy.sh admin arn:aws:iam::aws:policy/AdministratorAccess
GROUP=$1
POLICY_ARN=$2
echo "Adding group policy - ${POLICY_ARN} for group ${GROUP}"
aws iam attach-group-policy --group-name ${GROUP} --policy-arn ${POLICY_ARN}
echo "Trying to get the policy ${POLICY_ARN}"
aws iam get-policy --policy-arn ${POLICY_ARN}
echo "Listing all group policies for group ${GROUP}"
aws iam list-attached-group-policies --group-name ${GROUP}