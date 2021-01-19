# ort-receiver3

This is an AWS based lambda receiver intended to replace the old PHP code.

## Build and Deploy

Ensure your AWS-CLI environment is up and running, and you have your access tokens prepared for your account.

To build the system:

```bash
sam build
```

To deploy the system, creating the CloudFormation stack and preparing the default API Gateway:

```bash
sam deploy
```