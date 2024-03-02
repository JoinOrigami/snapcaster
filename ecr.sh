#!/usr/bin/env bash

set -e

REGISTRY=996247265255.dkr.ecr.us-east-1.amazonaws.com

if [ "$1" == "login" ]; then
  aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $REGISTRY
fi

if [ "$1" == "push" ]; then
  docker build -t $REGISTRY/snapcaster:latest -f Dockerfile .
  docker push $REGISTRY/snapcaster:latest
fi

