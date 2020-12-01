variable "aws_account_id" {
    type = string
    default = ""
}

variable "lambda_function_name" {
    type = string
    default = "primeTodoLambda"
}

variable "s3_bucket_website_endpoint" {
    type = string
    default = ""
}