`Build`
docker build -t wrench/api .

`Run`
docker run --env-file .env -p 4000:4000 -d wrench/api