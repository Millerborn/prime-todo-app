# Tell Terraform what Cloud Provider to use
provider "aws" {
    region = "us-east-1"
}


# S3 Bucket
resource "aws_s3_bucket" "main" {
  # Name of the Bucket
  bucket = var.bucket_name

  # https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl
  acl    = "private"

  # allow terraform to delete the bucket with objects inside of it
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  # Enable encryption
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm     = "AES256"
      }
    }
  }
}

# S3 Bucket Policy - Update with your IP Address
# Google "What's my ip" to get your IP Address
resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.main.id

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowReadAccessFromComputer",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${var.bucket_name}/*",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "${var.source_ip}"
                }
            }
        }
    ]
}
POLICY
}
