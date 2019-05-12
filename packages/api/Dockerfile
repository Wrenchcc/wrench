FROM node:12.2.0-alpine

WORKDIR /app

COPY . /app
RUN yarn

EXPOSE 4000
CMD [ "yarn", "start" ]
