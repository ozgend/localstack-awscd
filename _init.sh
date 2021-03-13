#! /bin/bash

# localstack + infra
(cd localstack-compose && docker-compose up -d)
(cd infrastructure && terraform init && terraform apply -auto-approve)

## consumer-lambda
(cd src && ./pack.sh consumer-lambda v1)
(cd src/.deploy/consumer-lambda && terraform init && terraform apply -var="lambda_version=v1" -auto-approve)

## query-lambda
(cd src && ./pack.sh query-lambda v1)
(cd src/.deploy/query-lambda && terraform init && terraform apply -var="lambda_version=v1" -auto-approve)

