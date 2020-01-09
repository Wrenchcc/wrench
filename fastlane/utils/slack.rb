def slack_notification(platform, build_number, version, success)
  slack(
    message: "Wrench (#{platform})",
    pretext: success ? "Build ##{build_number} succeeded :rocket:" : "Build ##{build_number} just broked :scream:",
    channel: "#release",
    success: success,
    use_webhook_configured_username_and_icon: true,
    payload: { 
      "Build" => build_number,
      "Version" => version
    },
    attachment_properties: { 
      thumb_url: "https://edge-files.wrench.cc/static/email/logo.jpg?w=60&h=60&dpr=3",
    }
  )
end
