
FROM node:8.2.1-alpine
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app

ENTRYPOINT ["yarn","test"]

