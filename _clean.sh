#! /bin/bash

echo 'terminating containers'
(cd localstack-compose && docker-compose kill && docker-compose rm -f)

echo 'removing files'
rm -rfv ./localstack-compose/volume/tmp
rm -rfv ./src/.dist
find . -name '*.tfstate*' -print -delete
