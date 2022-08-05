FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

CMD ["yarn", "start"]
