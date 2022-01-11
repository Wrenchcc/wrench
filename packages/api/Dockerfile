FROM mhart/alpine-node:16.13.2
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM mhart/alpine-node:slim-16.13.2
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 4000

CMD ["node", "dist/index.js"]