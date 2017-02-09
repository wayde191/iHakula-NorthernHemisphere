FROM centos:7

RUN yum install --assumeyes wget
RUN yum install --assumeyes curl
RUN yum install --assumeyes unzip

WORKDIR /var/lib/go-agent/pipelines/NorthernHemisphere/
COPY ./docker/api/install_dev_env.sh /var/lib/go-agent/pipelines/NorthernHemisphere/install_dev_env.sh

RUN /bin/bash /var/lib/go-agent/pipelines/NorthernHemisphere/install_dev_env.sh

#ENTRYPOINT ["api_entry_point.sh"]