FROM node:15.12-alpine3.12

LABEL maintainer="smith404@live.com"

RUN apk update && \
    mkdir -p /srv/client

WORKDIR /srv/client

COPY ./docker/local.start.sh /tmp/start.sh

ENV ENV="/root/.ashrc"
ENV NODE_ENV="development"

CMD ["ash", "/tmp/start.sh"]
