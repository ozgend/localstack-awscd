data "aws_s3_bucket_object" "query_lambda_pack" {
  bucket = var.lambda_bucket
  key    = "query-lambda/${var.lambda_version}/lambda.zip"
}

data "aws_iam_role" "lambda_role" {
  name = "lambda_role"
}

resource "aws_lambda_function" "query_lambda" {
  function_name    = "query-lambda"
  s3_bucket        = data.aws_s3_bucket_object.query_lambda_pack.bucket
  s3_key           = data.aws_s3_bucket_object.query_lambda_pack.key
  handler          = "index.handler"
  runtime          = "nodejs12.x"
  role             = data.aws_iam_role.lambda_role.arn
}
