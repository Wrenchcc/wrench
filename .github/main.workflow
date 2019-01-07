workflow "Deploy API" {
  on = "push"
  resolves = ["Deploy"]
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Deploy" {
  needs = "Build"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "deploy production -C api --no-build"
}
