# syntax=docker/dockerfile:1

FROM node:16-alpine

ENV NODE_ENV=dev

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]