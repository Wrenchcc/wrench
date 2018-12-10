workflow "Deploy" {
  on = "push"
  resolves = ["Deploy API"]
}

action "Build API" {
  uses = "culturehq/actions-yarn@master"
  args = "install && build:api"
}

action "Deploy API" {
  needs = "Build API"
  uses = "./actions/deploy/"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy production"
}
