Create hosted zone (can do this before transfer in)

Make ACM - AWS Certificate Manager - need this for AcmCertificateArn param

# Make bucket

aws --profile aug24 --region us-east-1 cloudformation create-stack --stack-name notdeadyet-bucket --template-body "$(cat cfn/cfn-bucket.yaml)" --parameters ParameterKey=RootDomainName,ParameterValue=www.notdeadyet.uk 

# Make CloudFront distribution in us-west-1

aws --profile aug24 --region us-east-1 cloudformation create-stack --stack-name notdeadyet-cloudfront --template-body "$(cat cfn/cfn-cloudfront.yaml)" --parameters ParameterKey=BucketAddress,ParameterValue=www.notdeadyet.uk ParameterKey=AcmCertificateArn,ParameterValue=arn:aws:acm:us-east-1:016322144435:certificate/e907cc7c-d19a-4b6a-a959-45546f23feb3


# Update CNAME of CloudFront distribution (can't be done with CFN)

Create alias record
