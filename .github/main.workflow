workflow "Deploy" {
  on = "push"
  resolves = ["Notification"]
}

action "Build API" {
  uses = "nuxt/actions-yarn@master"
  args = "build:api"
}

# Filter for master branch
action "Filter Master" {
  needs = "Build API"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy API Production" {
  needs = "Filter Master"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C packages/api deploy production"
}

action "Notification" {
  needs = "Deploy API Production"
  uses = "apex/actions/slack@master"
  secrets = ["SLACK_WEBHOOK_URL", "SLACK_CHANNEL"]
}
