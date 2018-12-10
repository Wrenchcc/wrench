workflow "Deploy" {
  on = "push"
  resolves = ["Deploy API"]
}

action "Build" {
  uses = "./actions/build/"
}

action "Deploy API" {
  needs = "Build"
  uses = "./actions/deploy/"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy production"
}
