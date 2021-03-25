#!/bin/bash
if [[ $EUID -ne 0 ]]; then
   echo "must be root" 
   exit 1
fi

echo 'terminating containers'
(cd localstack-compose && docker-compose kill && docker-compose rm -f)

echo 'removing files'
rm -rfv ./localstack-compose/volume/tmp
rm -rfv ./src/.dist
find . -name '*.tfstate*' -print -delete
find . -name '*.terraform.lock.hcl' -print -delete
