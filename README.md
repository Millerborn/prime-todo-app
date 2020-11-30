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
  - <https://formulae.brew.sh/formula/terraform>
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
zip -r ./server-lambda.zip . # this creates a zip file needed by terraform
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
terraform plan # verify changes
terraform apply # create resources in AWS

cd terraform/server
terraform plan # verify changes
terraform apply # create resources in AWS
# Terraform will output the api_gateway_invoke_url,
# this must be added to the client/src/API.ts file as the `apiGatewayUrl` variable
```

## Deploying

To deploy Client and NodeJS changes, follow these steps:

Linux and macOS:
```
cd client
# modify lambda function name if needed in package.json
npm run deploy # build project + sync build directory to S3 bucket

cd server
# modify lambda function name if needed in package.json
npm run deploy # zip changes + deploy zip file to Lambda function
```

## Running the App Locally

Requirements:

* Terraform resources have been created
* The API Gateway Invoke URL has been added to the client/src/API.ts file as the `apiGatewayUrl` variable

To use the App locally, follow these steps:

```
cd client
npm start
```
