# Terraform Project Setup

> Prime AWS Infrastructure setup

## Pre Setup

I recommend using homebrew to install aws, terraform, and yarn if not already installed.

Verify aws_access_key_id and aws_secret_access_key are set.
file path: /Users/your-user/.aws/credentials

example format below

```t
[default]
aws_access_key_id=access_key
aws_secret_access_key=secret_key
```

Make sure these tools are available and can be run in the terminal

```bash
yarn --version
aws --version
terraform --version
```


## Client Side Infrastructure Setup

1. cd into client folder
2. run `terraform init` to initialize
3. Google `what is my ip`, paste the result into the bucket-policy.json file
4. run `terraform plan` to see what will be created
5. run `terraform apply` to create AWS resources


## Server Side Infrastructure Setup

1. cd into server folder
2. run `terraform init` to initialize
3. run `terraform plan` to see what will be created
4. run `terraform apply` to create AWS resources
5. Get the output invoke url and paste it into the API variable in the client code
