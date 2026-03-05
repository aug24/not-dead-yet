#!/bin/bash -e

# Get CloudFront distribution ID for notdeadyet.uk
DIST_ID=$(aws --profile aug24 cloudfront list-distributions \
  --query "DistributionList.Items[?Aliases.Items[0]=='www.notdeadyet.uk'].Id | [0]" \
  --output text)

if [ -z "$DIST_ID" ] || [ "$DIST_ID" = "None" ]; then
  echo "Error: Could not find CloudFront distribution for www.notdeadyet.uk"
  exit 1
fi

echo "Invalidating CloudFront distribution: $DIST_ID"
aws --profile aug24 cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --paths "/*"

echo "Done! Cache invalidation in progress (takes 1-2 minutes)."
