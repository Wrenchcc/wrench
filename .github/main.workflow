workflow "Deploy API" {
  on = "push"
  resolves = ["Notification"]
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "build:api"
}

# Filter for master branch
action "Master" {
  needs = "Build"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy" {
  needs = "Master"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy production"
}

action "Notification" {
  needs = "Deploy"
  uses = "apex/actions/slack@master"
  secrets = ["SLACK_WEBHOOK_URL", "SLACK_CHANNEL"]
}
