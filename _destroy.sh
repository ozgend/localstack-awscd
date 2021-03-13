#! /bin/bash

echo 'destroying resources'
(cd src/.deploy/consumer-lambda && terraform destroy -auto-approve)
(cd src/.deploy/query-lambda && terraform destroy -auto-approve)
(cd infrastructure && terraform destroy -auto-approve)

echo 'terminating containers'
(cd localstack-compose && docker-compose kill && docker-compose rm -f)

echo 'removing files'
find . -name '*.tfstate*' -delete
rm -rf ./localstack-compose/volume/tmp
rm -rf ./src/.dist