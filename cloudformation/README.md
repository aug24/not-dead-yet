I messed about with this after building, so most of this is probably junk.  Will tidy up one day.


Create hosted zone (can do this before transfer in)

Make ACM - AWS Certificate Manager - need this for AcmCertificateArn param - done
 - arn:aws:acm:us-east-1:016322144435:certificate/ca1d3851-6a3c-43ba-b543-87b0b7394b72

# Make bucket

aws --profile aug24 --region us-east-1 cloudformation create-stack --stack-name notdeadyet-bucket --template-body "$(cat cfn/cfn-bucket.yaml)" --parameters ParameterKey=RootDomainName,ParameterValue=www.notdeadyet.uk 

# Make CloudFront distribution in us-west-1

aws --profile aug24 --region us-east-1 cloudformation create-stack --stack-name notdeadyet-cloudfront --template-body "$(cat cfn/cfn-cloudfront.yaml)" --parameters ParameterKey=BucketAddress,ParameterValue=www.notdeadyet.uk ParameterKey=AcmCertificateArn,ParameterValue=arn:aws:acm:us-east-1:016322144435:certificate/ca1d3851-6a3c-43ba-b543-87b0b7394b72


# Update CNAME of CloudFront distribution (can't be done with CFN)

Create alias record
