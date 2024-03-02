#!/usr/bin/env bash

ESBUILD_SOURCE=$1

if [ -z "$2" ]
then
  ESBUILD_OUT="build"
else
  ESBUILD_OUT=$2
fi

esbuild $ESBUILD_SOURCE --outdir=$ESBUILD_OUT \
  --color=true \
  --bundle \
  --platform=node \
  --target=node18 \
  --external:sodium-native \
  --external:@resvg/resvg-js
