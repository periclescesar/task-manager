### build
FROM node:16.14-alpine3.15 as build
WORKDIR /app
ADD . /app
RUN npm ci --progress=false --production=false
RUN npm run build
RUN npm prune --production
USER node

### run
FROM node:16.14-alpine3.15

WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
COPY --from=build /app/tsconfig.json /app/tsconfig.json
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000

ENV TS_NODE_BASEURL=./dist
