resource "aws_dynamodb_table" "transaction_table" {
  name           = "transactions"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "hash"
  range_key      = "timestamp"

  attribute {
    name = "hash"
    type = "S"
  }

  attribute {
    name = "amount"
    type = "N"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  global_secondary_index {
    name               = "amountIndex"
    hash_key           = "hash"
    range_key          = "amount"
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "INCLUDE"
    non_key_attributes = ["timestamp"]
  }
}
