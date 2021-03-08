# bootstrap localstack

    $ cd localstack-compose && docker-compose up



# initialize infrastructure 

    $ cd infrastructure
    $ terraform init && terraform apply -auto-approve



# build & publish lambda assets
    
    $ cd src
    $ sudo ./pack.sh APP-lambda VERSION



# deploy lambda

    $ cd src/.deploy/APP-lambda
    $ terraform init && terraform apply -var="lambda_version=VERSION" -auto-approve
