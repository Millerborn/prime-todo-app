# Prime TODO App + AWS Infrastructure

This project allows anyone who is interested in learning about and deploying AWS infrastructure to do so.

This project will create a static S3 Website that interacts with a NodeJs Lambda function and a DynamoDB database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have an active AWS account appropriate privileges
* The `aws_access_key_id` and `aws_secret_access_key` exist in your /Users/user/.aws/credentials file
* You have installed the latest version of `aws cli`
  - <https://formulae.brew.sh/formula/awscli>
* You have installed the latest version of `terraform`
  - <https://learn.hashicorp.com/tutorials/terraform/install-cli>
* You have installed the latest version of `yarn`
  - <https://formulae.brew.sh/formula/yarn>

## Installing

To install and setup the Client and Server code, follow these steps:

Linux and macOS:
```
cd client
yarn install

cd server
npm install
npm run build # this creates a zip file needed by terraform
```

To install and setup the Client and Server Infrastructure, follow these steps:

Linux and macOS:
```
cd terraform/client
terraform init
# add variables in variables.tf

cd terraform/server
terraform init
# add variables in variables.tf
```

## Building

To create the AWS infrastructure, follow these steps:

Linux and macOS:
```
cd terraform/client
# Add variables in the variables.tf file
terraform plan # verify changes
terraform apply # create resources in AWS
# Copy the `website_endpoint` that gets output and paste it into the server variables.tf file

cd terraform/server
terraform plan # verify changes
terraform apply # create resources in AWS
# Terraform will output the api_gateway_invoke_url,
# Add this to the client/src/API.ts file as the `apiGatewayUrl` variable
# The API Gateway can take 5 - 10 minutes to start working
# If you see an error after 10 minutes it might be time to troubleshoot :)
```

## Deploying

To deploy Client and NodeJS changes, follow these steps:

Linux and macOS:
```
cd client
# modify s3 bucket name in the package.json deploy script
npm run deploy # this will build the project and sync the build directory to your S3 bucket

cd server
# modify lambda function name if needed in package.json
npm run deploy # zip changes + deploy zip file to Lambda function
```

## Running the App Locally

Requirements:

* Terraform resources have been created
* The API Gateway Invoke URL has been added to the client/src/API.ts file as the `apiGatewayUrl` variable
* As a note - the API Gateway can take 5 - 10 minutes to start working

To use the App locally, follow these steps:

```
cd client
npm start
```
