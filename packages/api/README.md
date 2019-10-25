`Build`
docker build -t wrench/api .

`Run`
docker run --env-file .env -p 4000:4000 -d wrench/api

`Build task`
Install fargate CLI
`go get -u github.com/awslabs/fargatecli`

fargate service create --region eu-west-1 --port http:4000 api --subnet-id subnet-37041e7e --security-group-id default

fargate lb create --port http:80 wrench

fargate service env --region eu-west-1 set api --env DB_DATABASE=wrench

<!-- sg-99b1b0e2 -->

`Deploy`
`fargatecli service deploy api`