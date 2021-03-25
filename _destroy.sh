#!/bin/bash
if [[ $EUID -ne 0 ]]; then
   echo "must be root" 
   exit 1
fi

echo 'destroying resources'
(cd src/.deploy/consumer-lambda && terraform destroy -auto-approve)
(cd src/.deploy/query-lambda && terraform destroy -auto-approve)
(cd infrastructure && terraform destroy -auto-approve)

./_clean.sh
