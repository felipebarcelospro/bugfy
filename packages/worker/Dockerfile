FROM node:16.13.1-alpine

RUN mkdir /app
WORKDIR /app
ADD . .

RUN yarn

ENV NODE_ENV=production

CMD ["yarn", "start"]