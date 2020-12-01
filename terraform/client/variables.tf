variable "source_ip" {
    type = string
    default = ""
}

# AWS S3 bucket names must be unique
# https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html
variable "bucket_name" {
    type = string
    default = "unique_bucket_name"
}