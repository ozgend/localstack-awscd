resource "aws_s3_bucket" "lambda_storage" {
  bucket = "app-consumer-lambda"
}

resource "aws_s3_bucket_object" "consumer_lambda_pack" {
  bucket = aws_s3_bucket.lambda_storage.bucket
  key    = "consumer-lambda/${var.lambda_version}/lambda.zip"
  source = "../../.dist/consumer-lambda/${var.lambda_version}/lambda.zip"
  etag   = filemd5("../../.dist/consumer-lambda/${var.lambda_version}/lambda.zip")
}

data "aws_iam_role" "lambda_role" {
  name = "lambda_role"
}

data "aws_kinesis_stream" "event_stream" {
  name = "transaction-stream"
}

resource "aws_lambda_function" "consumer_lambda" {
  function_name = "consumer-lambda"
  s3_bucket     = aws_s3_bucket_object.consumer_lambda_pack.bucket
  s3_key        = aws_s3_bucket_object.consumer_lambda_pack.key
  handler       = "index.handler"
  runtime       = "nodejs12.x"
  role          = data.aws_iam_role.lambda_role.arn
}

resource "aws_lambda_event_source_mapping" "kinesis_lambda_event_mapping" {
  batch_size        = 100
  event_source_arn  = data.aws_kinesis_stream.event_stream.arn
  enabled           = true
  function_name     = aws_lambda_function.consumer_lambda.arn
  starting_position = "TRIM_HORIZON"
}

output "lambda_zip" {
  value = aws_s3_bucket_object.consumer_lambda_pack.key
}
