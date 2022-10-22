FROM node:16.14-alpine3.15
WORKDIR /app
ADD . /app

RUN npm install -g typescript ts-node ts-node-dev

EXPOSE 3000

