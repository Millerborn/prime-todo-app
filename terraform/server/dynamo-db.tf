resource "aws_dynamodb_table" "main" {
  name           = "PrimeTable"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  point_in_time_recovery {
      enabled = false
  }

  tags = {
    Name        = "prime-todo-table"
  }
}

