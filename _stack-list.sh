#! /bin/bash
echo "--- kinesis resources:"
aws --endpoint-url http://localhost:4566 kinesis list-streams
echo "------"

echo "--- dynamodb resources:"
aws --endpoint-url http://localhost:4566 dynamodb list-tables && aws --endpoint-url http://localhost:4566 dynamodb describe-table --table-name transactions
echo "------"

echo "--- s3 resources:"
aws --endpoint-url http://localhost:4566 s3 ls
echo "------"

echo "--- lambda resources:"
aws --endpoint-url http://localhost:4566 lambda list-functions
echo "------"

echo "--- apigateway resources:"
aws --endpoint-url http://localhost:4566 apigateway get-rest-apis
echo "------"