FROM node:latest

WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

EXPOSE 80
CMD ["yarn", "start"]
