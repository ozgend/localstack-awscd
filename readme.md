# localstack-iac-sample
sample iac with localstack for aws community day

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
$ (cd src && sudo ./pack.sh APP-lambda VERSION)
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