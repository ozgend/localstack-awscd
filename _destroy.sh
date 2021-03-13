#! /bin/bash

(cd src/.deploy/consumer-lambda && terraform destroy -auto-approve)
(cd src/.deploy/query-lambda && terraform destroy -auto-approve)
(cd infrastructure && terraform destroy -auto-approve)
find . -name '*.tfstate*' -delete
(cd localstack-compose && docker-compose kill && docker-compose rm -f)
rm -rf ./localstack-compose/volume/tmp
rm -rf ./src/.dist