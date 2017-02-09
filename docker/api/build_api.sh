#!/usr/bin/env bash
set -ex
echo "----------------------------------build docker image"
docker build -t centos7_lein -f ./docker/api/Dockerfile .
echo "----------------------------------tag image"
docker tag centos7_lein ihakula/centos7-lein:latest

docker login --username $DOCKER_USER --password $DOCKER_PASS
echo "----------------------------------push to hub"
docker push ihakula/centos7-lein:latest

