FROM mhart/alpine-node:12
WORKDIR /app
COPY . .
RUN yarn && yarn compile

FROM mhart/alpine-node:slim-12
WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 4000

CMD ["node", "dist/index.js"]