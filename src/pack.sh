#! /bin/bash

export AWS_ACCESS_KEY_ID=mock
export AWS_SECRET_ACCESS_KEY=mock
export AWS_DEFAULT_REGION=us-east-1

APP=$1
VERSION=$2
# LAMBDA_BUCKET=denolk-lambda-storage

mkdir -p ./.dist/$APP/$VERSION/
(cd $APP && zip -r -D ../.dist/$APP/$VERSION/lambda.zip * -x '*node_modules*')
echo "pack completed: $APP/$VERSION/lambda.zip"
# aws --endpoint-url=http://localhost:4566 s3 cp ./.dist/$APP/$VERSION/lambda.zip s3://$LAMBDA_BUCKET/$APP/$VERSION/lambda.zip
