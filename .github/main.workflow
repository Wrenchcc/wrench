workflow "Deploy API" {
  on = "push"
  resolves = ["Deploy"]
}

action "Build" {
  uses = "./actions/build/"
  args = "install"
}

action "Deploy" {
  needs = "Build"
  uses = "./actions/deploy/"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "deploy production"
}
