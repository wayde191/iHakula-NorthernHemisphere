#!/usr/bin/env bash

# git rm -f --cached `git ls-files -i --exclude-standard`

export DOCKER_USER=ihakula
export DOCKER_PASS=wayde191
export DOCKER_STAGE=build-deploy

./docker/api/build_api.sh