workflow "Deploy" {
  on = "push"
  resolves = ["Deploy API"]
}

action "Build API" {
  uses = "actions/npm@master"
  args = "install"
}

action "Deploy API" {
  needs = "Build API"
  uses = "./actions/deploy/"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy production"
}
