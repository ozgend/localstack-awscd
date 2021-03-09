resource "aws_s3_bucket_object" "query_lambda_pack" {
  bucket = var.lambda_bucket
  key    = "query-lambda/${var.lambda_version}/lambda.zip"
  source = "../../.dist/query-lambda/${var.lambda_version}/lambda.zip"
  etag   = filemd5("../../.dist/query-lambda/${var.lambda_version}/lambda.zip")
}

data "aws_iam_role" "lambda_role" {
  name = "lambda_role"
}

resource "aws_lambda_function" "query_lambda" {
  function_name = "query-lambda"
  s3_bucket     = aws_s3_bucket_object.query_lambda_pack.bucket
  s3_key        = aws_s3_bucket_object.query_lambda_pack.key
  handler       = "index.handler"
  runtime       = "nodejs12.x"
  role          = data.aws_iam_role.lambda_role.arn
}

output "lambda_zip" {
  value = aws_s3_bucket_object.query_lambda_pack.key
}
