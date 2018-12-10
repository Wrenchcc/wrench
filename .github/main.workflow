workflow "Deploy" {
  on = "push"
  resolves = ["Deploy API"]
}

action "Deploy API" {
  uses = "./actions/deploy/"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy production"
}
