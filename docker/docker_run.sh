#!/usr/bin/env bash

docker stop northern-service || true
docker rm northern-service || true

docker run \
 --name northern-service \
 -p 8802:3000 \
 -e VIRTUAL_HOST=www.sunzhongmou.com \
 -itd \
 -v $(pwd):/var/lib/go-agent/pipelines/NorthernHemisphere/ \
 -w /var/lib/go-agent/pipelines/NorthernHemisphere/ \
 \
 ihakula/centos7-lein:latest \
 /bin/bash

docker exec northern-service /var/lib/go-agent/pipelines/NorthernHemisphere/go deploy-staging
docker exec northern-service /usr/bin/systemctl stop northern-hemisphere-dev
docker exec northern-service /usr/bin/systemctl start northern-hemisphere-dev
