#!/usr/bin/env bash

docker stop northern-service || true
docker rm northern-service || true

docker run \
 --name northern-service \
 -p 8802:3000 \
 --privileged=true \
 -e "container=docker" \
 -e VIRTUAL_HOST=www.sunzhongmou.com \
 -itd \
 -v /sys/fs/cgroup:/sys/fs/cgroup \
 -v $(pwd):/var/lib/go-agent/pipelines/NorthernHemisphere/ \
 -w /var/lib/go-agent/pipelines/NorthernHemisphere/ \
 \
 ihakula/centos7-lein:centos_lein_build