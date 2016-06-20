## Create secure IAM groups and users for Administrators for accounts with only a root account

###Basic rundown on IAM Identities

- IAM users
    - the IAM user represents the person or service who uses the IAM user to interact with AWS
- IAM group
    - the IAM group is a collection of users.  You can use groups to specify permissions for a collection of users
- IAM roles
    - the IAM role is similar to a user, in that it is an identity with permission policies that determine what the identity can and cannot do in AWS.  A role does not have any credentials(password or access keys) associated with it. Instead of being uniquely associated with one person, a role is intended to be assumable by anyone who needs it.  An IAM user can assume a role temporarily to take on different permissions for a specific task

###The following short tutorial will deal with just creating an admin group and a user.  This is considered a best practice by Amazon.

On a new AWS account where you only have the root ID and password, you will want to create an admin group to manage your AWS account.  Which means don’t create access keys for the root account, I recommend doing the following:

You want to manage policies and permissions on the group level rather than the user level.  Group examples - administrators, developers, etc
We will first create the admin group manually through the console.  Following are the instructions to do this.

####First manually create an admin user instead of using using the “root” user. Do this via the console as “root”(your initial / original ) account

- go to https://console.aws.amazon.com/iam/
- Create an administrators group
    - on the left side of the page click on “groups"
    - click on the blue button that says “Create New Group"
    - enter group name - i.e. Administrators then click “Next Step"
        - you will see a list of policies that can be attached, click on the checkbox for “AdministratorAccess”, click “Next Step"
        - if everything looks good to you click on “Create Group"
- Create an IAM user for yourself
    - on the left side of the page click on “users"
    - click on the blue button that says “Create New Users"
    - enter your username
    - clear the checkbox that says “Generate an access key for each user"
    - click “create"
    - you should now see a list of user(s), click on the name (NOT the checkbox)
    - you should see 4 tabs, one of them titled “Groups”, click on that tab
    - click the blue button that says “Add Users to Group"
    - select the group you just created i.e. “Administrators"
    - click “Add to Group"
    - now you click on the tab that says “Security Credentials"
    - click on the button that says “Manage Password"
    - click on the radio button that says “Assign a custom password"
    - fill out the password fields, then click “Apply” button
- create an alias
    - if you don’t create an alias you will have this as your URL
        - https://aws_account_number.signin.aws.amazon.com/console/   -  with as_account_number as your actual account number i.e. 123456789012
        - if you are still not logged in, log into https://console.aws.amazon.com/iam/ with your root account
        - click “Dashboard” in the upper left hand side of the screen
        - find the IAM user’s sign in link
        - to create the alias click “Customize” enter the name you want to you for your alias. i.e. mycompany
        - click create
        - sign off your root account
        - your new url will look something like this now https://custom_name.signin.aws.amazon.com
- You can now use your newly created IAM user to administer your account.  This account will not have access to your billing information, and probably some other stuff, not sure what exactly

You can now create other groups, etc, via the console or through the command line.  If you choose to do it through the command line you need to set up the following

####Installing CLI (Command Line Tools) for macs

- install aws-cli
    - the following link will give you the info to install the command line tool
    - http://docs.aws.amazon.com/cli/latest/userguide/installing.html#install-bundle-other-os
- create keys
    - http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html#cli-signup contains the following information
    - log in via the new aliased url you just created -  https://custom_name.signin.aws.amazon.com
    - click your username on the upper right hand side of the page
    - you should see a drop down menu and on that menu you will see “Security Credentials”, click on that
    - on the left hand menu, click on the menu item named “Users"
    - find your user and click on the line, not the checkbox
    - click on the “Security Credentials”  tab if you are not already on that tab
    - click “Create Access Key"
    - a popup will show up and you will see your credentials and/or you can download them, keep the downloaded information in a safe place.  You cannot retrieve this information from AWS again
- for general use this following is the quickest way to set up your AWS CLI
    - type the following in your terminal
        - aws configure
        - you will see prompts asking for you AWS Access Key ID, Secret key, default region (I use us-east-1, you can use whatever you want) and default format output, i.e. json
        - location of this data is in ~/.aws/config and ~/.aws/credentials
            - http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-config-files
    - you can create profiles, etc if you like.  I will not get into that here but here is a page containing that information
        - http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-multiple-profiles

####Available scripts, these are some really basic wrappers around aws cli commands - I will add more when the need arises.

- create a group
    - run ./create_group.sh ${group_name}
    - i.e. ./create_group.sh developers
- add single group policy to an existing group
    - to get a list of possible policies for IAM
        - aws iam list-policies | less
    - run ./add_group_policy.sh ${group_name} ${policy_arn}
    - i.e. ./add_group_policy.sh administrators arn:aws:Liam:aws:policy/AdministratorAcess
- add a multitude of group policies to an existing group
    - run ./add_group_policies.sh ${group} ${group_policies.txt}
    - run ./add_group_policies.sh developers group_policies.txt
        - note that the group_policies.txt can be named anything, it has no bearing on the execution of the script
        - also note that there should be only one policy arn per line in the file containing the group policy arns, you can look at the example file group_policies.txt.sample included in the repository
- delete a group
    - run ./delete_group.sh ${group_name}
    - i.e. ./delete_group.sh developers
- delete single group policy to an existing group
    - run ./delete_group_policy.sh ${group_name} ${policy_arn}
    - i.e. ./delete_group_policy.sh administrators arn:aws:Liam:aws:policy/AdministratorAcess
- delete a multitude of group policies to an existing group
    - run ./delete_group_policies.sh ${group} ${group_policies.txt}
    - i.e. run ./delete_group_policies.sh developers group_policies.txt
        - note that the group_policies.txt can be named anything, it has no bearing on the execution of the script
        - also note that there should be only one policy arn per line in the file containing the group policy arns, you can look at the example file group_policies.txt.sample included in the repository
- get users for a group
    - run ./get_users_for_group.sh ${group}
    - i.e. ./get_users_for_group.sh admins
