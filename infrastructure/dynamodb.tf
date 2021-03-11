resource "aws_dynamodb_table" "transaction_table" {
  name           = "transactions"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "hash"

  attribute {
    name = "hash"
    type = "S"
  }
}
