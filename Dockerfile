# --- Base: this stage includes only the production npm dependencies --- #
FROM node:8.2.1-alpine AS base

# install missing dependecies for node-alpine. git is needed for git url depndencies in npm modules
RUN apk --no-cache update
RUN apk add git
RUN rm -rf /var/cache/apk/*

WORKDIR /app

# if an npm token was supplied as a build-arg use it for installing modules
ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > /app/.npmrc

COPY package.json yarn.lock /app/
RUN yarn install --production

# remove the npmrc file generated
RUN rm -f /app/.npmrc

# --- Build: this stage installs the dev dependencies, optionally transpiles code, runs tests --- #
FROM base AS build

RUN yarn install

COPY ./src /app/src
RUN yarn test

# --- Release: this is what the container will include for release --- #
FROM base AS release

COPY --from=build /app/src /app/src

EXPOSE 3000

ENTRYPOINT ["yarn","start"]