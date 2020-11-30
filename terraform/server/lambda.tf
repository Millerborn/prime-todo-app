# Tell Terraform what Cloud Provider to use
provider "aws" {
    region = "us-east-1"
}

# Node Lambda Function
resource "aws_lambda_function" "main" {
  filename      = "../../server/server-lambda.zip"  
  function_name = var.lambda_function_name
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs12.x"

  memory_size = 1024
  timeout = 6

  environment {
      variables = {
          TABLE = "PrimeTable"
      }
  }
}

# Permissions 
# allow DynamoDB access
# allow Lambda to write output logs to CloudWatch
resource "aws_iam_role" "lambda_role" {
  name = "primeTodoRole"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "primeTodoPolicy"
  path        = "/"
  description = "Policy to perform CRUD operations to DynamoDB"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:Scan",
                "dynamodb:Query",
                "dynamodb:UpdateItem"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:CreateLogGroup"
            ],
            "Resource": "arn:aws:logs:us-east-1:${var.aws_account_id}:log-group:/aws/lambda/${var.lambda_function_name}:*"
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": "logs:PutLogEvents",
            "Resource": "arn:aws:logs:us-east-1:${var.aws_account_id}:log-group:/aws/lambda/${var.lambda_function_name}:*:*"
        }
    ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

