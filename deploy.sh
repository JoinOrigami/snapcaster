#!/usr/bin/env bash

set -e

SSH_HOST=ec2-user@35.169.98.62

scp ecr.sh $SSH_HOST:
scp docker-compose.production.yml $SSH_HOST:docker-compose.yml

ssh $SSH_HOST << EOF
  ./ecr.sh login
  docker-compose up -d
EOF
