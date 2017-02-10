FROM ihakula/centos7-lein:latest

WORKDIR /var/lib/go-agent/pipelines/NorthernHemisphere/
COPY / /var/lib/go-agent/pipelines/NorthernHemisphere/

RUN /var/lib/go-agent/pipelines/NorthernHemisphere/go deploy-staging
RUN yum clean all; systemctl enable northern-hemisphere-dev.service

CMD ["/usr/sbin/init"]