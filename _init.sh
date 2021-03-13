#! /bin/bash

echo 'creating localstack and infrastructure'
(cd localstack-compose && docker-compose up -d)
(cd infrastructure && terraform init && terraform apply -auto-approve)

echo 'creating consumer-lambda with resources'
(cd src && ./pack.sh consumer-lambda v1)
(cd src/.deploy/consumer-lambda && terraform init && terraform apply -var="lambda_version=v1" -auto-approve)

echo 'creating query-lambda with resources'
(cd src && ./pack.sh query-lambda v1)
(cd src/.deploy/query-lambda && terraform init && terraform apply -var="lambda_version=v1" -auto-approve)

