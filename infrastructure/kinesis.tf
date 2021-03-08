resource "aws_kinesis_stream" "event_stream" {
  name             = "transaction-stream"
  shard_count      = 1
  retention_period = 48
}
