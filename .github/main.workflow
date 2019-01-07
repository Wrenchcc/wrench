workflow "Deploy API" {
  on = "push"
  resolves = ["Notification"]
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "build:api"
}

# Filter for master branch
action "Filter Master" {
  needs = "Build"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Filter Staging" {
  needs = "Build"
  uses = "actions/bin/filter@master"
  args = "branch"
}

action "Deploy Production" {
  needs = "Filter Master"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy production"
}

action "Deploy Staging" {
  needs = "Filter Staging"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C api deploy staging"
}

action "Notification" {
  needs = "Deploy Production"
  uses = "apex/actions/slack@master"
  secrets = ["SLACK_WEBHOOK_URL", "SLACK_CHANNEL"]
}
