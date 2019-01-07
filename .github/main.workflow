workflow "Deploy API" {
  on = "push"
  resolves = ["Deploy"]
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "build:api"
}

action "Deploy" {
  needs = "Build"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy production"
}

action "Notification" {
  needs = "Deploy"
  uses = "apex/actions/slack@master"
  secrets = ["SLACK_WEBHOOK_URL", "SLACK_CHANNEL"]
}
