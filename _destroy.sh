#! /bin/bash

echo 'destroying resources'
(cd src/.deploy/consumer-lambda && terraform destroy -auto-approve)
(cd src/.deploy/query-lambda && terraform destroy -auto-approve)
(cd infrastructure && terraform destroy -auto-approve)

./_clean.sh
