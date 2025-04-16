FROM jenkins/jenkins:lts

USER root

WORKDIR /app

RUN apt-get update && \
    apt-get install -y \
    docker.io \
    docker-compose \
    git \
    npm \
    curl && \
    apt-get clean
