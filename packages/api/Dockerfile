FROM mhart/alpine-node:13

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

EXPOSE 4000

CMD ["node", "index.js"]
