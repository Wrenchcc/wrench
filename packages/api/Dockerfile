FROM mhart/alpine-node:slim-13
RUN apk add --no-cache curl
WORKDIR /app
COPY . .

EXPOSE 4000

CMD ["node", "index.js"]