# deployment with localstack & iac
aws@localhost: localstack + iac

sample deployment scenario with localstack and terraform / aws community day 2021

---

### bootstrap localstack
```bash
$ (cd localstack-compose && docker-compose up)
```

### initialize infrastructure 
```bash
$ (cd infrastructure && terraform init && terraform apply -auto-approve)
```

### build & publish lambda assets
```bash 
$ (cd src && ./pack.sh APP-lambda VERSION)
```

### deploy lambda
```bash
$ (cd src/.deploy/APP-lambda && terraform init)
$ (cd src/.deploy/APP-lambda && terraform apply -var="lambda_version=VERSION" -auto-approve)
```

### destroy
```bash
$ (cd src/.deploy/APP-lambda && terraform destroy)
$ (cd infrastructure && terraform destroy)
```

---

## demo

### initialization 
```bash
chmod +x ./_init.sh && ./_init.sh
```


### lambda deployments

- **query-lambda**

| cli | |
| -- | -- |
| pack | `(cd src && ./pack.sh query-lambda v1)` |
| deploy | `(cd src/.deploy/query-lambda && terraform apply -var="lambda_version=v1" -auto-approve)` |
| request | `curl http://localhost:4566/restapis/[API_ID]/test/_user_request_/HASH` |
| logs | `aws --endpoint-url=http://localhost:4566 logs tail /aws/lambda/query-lambda --follow` |


- **consumer-lambda**

| cli | |
| -- | -- |
| pack | `(cd src && ./pack.sh consumer-lambda v1)` |
| deploy | `(cd src/.deploy/consumer-lambda && terraform apply -var="lambda_version=v1" -auto-approve)` |
| logs | `aws --endpoint-url=http://localhost:4566 logs tail /aws/lambda/consumer-lambda --follow` |