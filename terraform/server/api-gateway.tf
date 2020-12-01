# API Gateway
resource "aws_apigatewayv2_api" "main" {
  name          = "prime-todo"
  protocol_type = "HTTP"
  cors_configuration {
    allow_credentials = false
    allow_headers = ["*"]
    allow_methods = ["POST"]
    allow_origins = [
      "http://localhost:3000",
      "http://${var.s3_bucket_website_endpoint}"
    ]
    expose_headers = []
    max_age = 3000
  }
}

resource "aws_apigatewayv2_integration" "main" {
  api_id           = aws_apigatewayv2_api.main.id
  integration_type = "AWS_PROXY"
  payload_format_version = "2.0"

  connection_type           = "INTERNET"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.main.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}

# Allow the API Gateway to Invoke the Lambda Function
resource "aws_lambda_permission" "apigw" {
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name = aws_lambda_function.main.function_name
   principal     = "apigateway.amazonaws.com"

   # The "/*/*" portion grants access from any method on any resource
   # within the API Gateway REST API.
   source_arn = "${aws_apigatewayv2_api.main.execution_arn}/*/*/${var.lambda_function_name}"
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id = aws_apigatewayv2_api.main.id
  name   = "main-stage"
  auto_deploy = true
}

resource "aws_apigatewayv2_route" "route" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "ANY /${var.lambda_function_name}"
  target = "integrations/${aws_apigatewayv2_integration.main.id}"
}

