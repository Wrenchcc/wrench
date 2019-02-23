workflow "Deploy" {
  on = "push"
  resolves = ["Notification"]
}

action "Filter Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Filter Branch" {
  uses = "actions/bin/filter@master"
  args = "not branch master"
}

action "Build API" {
  needs = "Filter Master"
  uses = "nuxt/actions-yarn@master"
  args = "build:api"
}

action "Build Web" {
  needs = "Filter Master"
  uses = "nuxt/actions-yarn@master"
  args = "build:web"
}

action "Build Web Staging" {
  needs = "Filter Branch"
  uses = "nuxt/actions-yarn@master"
  args = "build:web"
}

action "Deploy API Production" {
  needs = "Build API"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C packages/api deploy production"
}

action "Deploy Web Production" {
  needs = "Build Web"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C packages/web deploy staging"
}

action "Deploy Web Staging" {
  needs = "Build Web Staging"
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C packages/web deploy staging"
}

action "Notification" {
  needs = ["Deploy API Production", "Deploy Web Production"]
  uses = "apex/actions/slack@master"
  secrets = ["SLACK_WEBHOOK_URL", "SLACK_CHANNEL"]
}
