FROM mhart/alpine-node:12
WORKDIR /app
COPY . .
RUN yarn && yarn build
RUN yarn add global pm2

FROM mhart/alpine-node:slim-12
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 4000

CMD ["./node_modules/.bin/pm2-runtime", "dist/index.js"]