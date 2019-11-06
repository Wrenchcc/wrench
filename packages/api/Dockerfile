FROM mhart/alpine-node:12:13.0
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM mhart/alpine-node:slim-12:13.0
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=0 /app/dist .
COPY . .

EXPOSE 4000

CMD ["node", "index.js"]