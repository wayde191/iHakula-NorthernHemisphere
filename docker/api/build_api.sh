#!/usr/bin/env bash
set -ex

if [ $DOCKER_STAGE == "build-root" ]
then
    docker build -t centos7_lein -f ./docker/api/Dockerfile .
    docker tag centos7_lein ihakula/centos7-lein:latest
    docker login --username $DOCKER_USER --password $DOCKER_PASS
    docker push ihakula/centos7-lein:latest
fi

if [ $DOCKER_STAGE == "build-deploy" ]
then
    docker build -t centos_lein_build -f ./docker/Dockerfile .
    docker tag centos_lein_build ihakula/centos7-lein:centos_lein_build
    docker login --username $DOCKER_USER --password $DOCKER_PASS
    docker push ihakula/centos7-lein:centos_lein_build
fi

