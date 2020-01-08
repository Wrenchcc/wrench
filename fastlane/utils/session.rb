def retrieve_fastlane_session
  spaceauth_output = `bundle exec fastlane spaceauth`
  fastlane_session_regex = %r{Pass the following via the FASTLANE_SESSION environment variable:\n(?<session>.+)\n\n\nExample:\n.+}
  new_session = nil
  if match = spaceauth_output.match(fastlane_session_regex)
    new_session = match[:session].gsub("\e[4m\e[36m", "").gsub("\e[0m\e[0m", "")
  end

  # Yell and quit if unable to parse out session from spaceauth output
  if new_session.nil?
    puts "Unable to obtain new session via fastlane spaceauth"
    exit 1
  else
    ENV['FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD'] = new_session
    puts "New session obtained"
  end
end
