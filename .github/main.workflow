workflow "Deploy API" {
  on = "push"
  resolves = ["Deploy"]
}

action "Build" {
  uses = "./install/"
  args = "install"
}

action "Deploy" {
  needs = "Build"
  uses = "./deploy/"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "deploy production"
}
