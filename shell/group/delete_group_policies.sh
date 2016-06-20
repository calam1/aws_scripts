#!/usr/bin/env bash
# usage: pass the group name and a file containing the policy arns, in the file containing the policy arns make sure there is only one policy arn per line, you can look at the group_policies.txt.sample file.  i.e. ./delete_group_policies.sh admins group_policies.txt.sample
GROUP="$1"
filename="$2"
while read -r policy_arn
do
    name="$policy_arn"
    echo "Attempting to add the following policy arn $name"
    aws iam detach-group-policy --group-name ${GROUP} --policy-arn ${policy_arn}
done < "$filename"

echo "Listing all group policies remaining for group ${GROUP}"
aws iam list-attached-group-policies --group-name ${GROUP}
