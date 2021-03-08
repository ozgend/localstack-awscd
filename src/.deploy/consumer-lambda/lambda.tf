data "aws_s3_bucket_object" "consumer_lambda_pack" {
  bucket = var.lambda_bucket
  key    = "consumer-lambda/${var.lambda_version}/lambda.zip"
}

data "aws_iam_role" "lambda_role" {
  name = "lambda_role"
}

data "aws_kinesis_stream" "event_stream" {
  name = "transaction-stream"
}

resource "aws_lambda_function" "consumer_lambda" {
  function_name    = "consumer-lambda"
  s3_bucket        = data.aws_s3_bucket_object.consumer_lambda_pack.bucket
  s3_key           = data.aws_s3_bucket_object.consumer_lambda_pack.key
  handler          = "index.handler"
  runtime          = "nodejs12.x"
  role             = data.aws_iam_role.lambda_role.arn
}

resource "aws_lambda_event_source_mapping" "kinesis_lambda_event_mapping" {
  batch_size        = 100
  event_source_arn  = data.aws_kinesis_stream.event_stream.arn
  enabled           = true
  function_name     = aws_lambda_function.consumer_lambda.arn
  starting_position = "TRIM_HORIZON"
}
