FROM mhart/alpine-node:13
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM mhart/alpine-node:slim-13
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=0 /app/dist .
COPY . .

EXPOSE 4000

CMD ["node", "index.js"]