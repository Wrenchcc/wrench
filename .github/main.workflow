workflow "Deploy" {
  on = "push"
  resolves = ["Deploy API"]
}

action "Build API" {
  uses = "./actions/build-api/"
  args = "build:api"
}

action "Deploy API" {
  needs = "Build API"
  uses = "./actions/deploy-api/"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy production"
}
