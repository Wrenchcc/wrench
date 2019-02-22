workflow "Deploy" {
  on = "push"
  resolves = ["Notification"]
}

action "Build API" {
  uses = "nuxt/actions-yarn@master"
  args = "build:api"
}

action "Build Web" {
  uses = "nuxt/actions-yarn@master"
  args = "build:web"
}

# Filter for master branch
action "Filter Master" {
  needs = ["Build API", "Build Web"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy API Production" {
  needs = ["Filter Master", "Build API"]
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C packages/api deploy production"
}

action "Deploy Web Production" {
  needs = ["Filter Master", "Build Web"]
  uses = "apex/actions/up@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  args = "-C packages/web deploy staging"
}

action "Notification" {
  needs = ["Deploy API Production", "Deploy Web Production"]
  uses = "apex/actions/slack@master"
  secrets = ["SLACK_WEBHOOK_URL", "SLACK_CHANNEL"]
}
