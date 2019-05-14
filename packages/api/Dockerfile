FROM node:alpine

WORKDIR /app

COPY . /app
RUN yarn
RUN yarn build

EXPOSE 4000
CMD ["yarn", "start"]
