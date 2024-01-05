FROM node:18.17.1

RUN npm install -g serve

RUN mkdir ./build
ADD ./build ./build

ENTRYPOINT [ "serve", "-s", "build" ]