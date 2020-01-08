require './utils/filesize'  

# TODO: Add android file size
def slack_notification(platform, build_number, version, success)
  bundle_size = filesize(File.size('../../.builds/main.jsbundle'))

  slack(
    message: "Wrench (#{platform})",
    pretext: success ? "Build ##{build_number} succeeded :rocket:" : "Build ##{build_number} just broked :scream:",
    channel: "#release",
    success: success,
    use_webhook_configured_username_and_icon: true,
    payload: { 
      "Build" => build_number,
      "Version" => version,
      "Bundle Size" => bundle_size
    },
    default_payloads: [:git_branch, :git_author],
    attachment_properties: { 
      thumb_url: "https://edge-files.wrench.cc/static/email/logo.jpg?w=60&h=60&dpr=3",
    }
  )
end
