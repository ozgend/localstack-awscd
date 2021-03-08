#! /bin/bash

export AWS_ACCESS_KEY_ID=mock
export AWS_SECRET_ACCESS_KEY=mock
export AWS_DEFAULT_REGION=us-east-1
export CDK_DEPLOY_REGION=us-east-1
export CDK_DEPLOY_ACCOUNT=0000000000

cdklocal deploy -v