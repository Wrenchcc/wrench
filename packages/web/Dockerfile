FROM node:alpine

WORKDIR /app

COPY . /app

RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

RUN yarn
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
