# task-manager
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
[![Node](https://img.shields.io/badge/node-v16.14.2-green.svg)](https://nodejs.org/en/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# First run

Prerequisites
* [Docker](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)

```shell
$ cp .env.example .env
```
set your enviroments on .env file

````shell
$ npm install
````

include `127.0.0.1    db` on your /etc/hosts

## Running
`$ docker-compoose up`
- Open your browser and enter the following url: http://localhost:3001/health
- If everything is ok you should see this: `{"im":true}`

---
### Unit Tests
We use [Jest](https://jestjs.io/) to run all unit tests and coverage.


#### To run all tests, use:
```shell
npm run test
```

#### To get coverage report:
```shell
npm run test:coverage
```
coverage report are placed in `.reports/cov`

---
# Docs
To build Doc of API, run:
```shell
npm run gen:swagger
```

To see documentation, run:
```shell
docker-compose up swagger -d
```
And open http://localhost:8080

swagger file is autogenerate by [swagger-autogen](https://www.npmjs.com/package/swagger-autogen)

How to use: https://www.npmjs.com/package/swagger-autogen
