// import { links } from "react-native-firebase";
//
// const BASE = "https://wrench.cc";
// const DOMAIN = "wrench.page.link";
//
// export const createDynamicLink = async ({
//   path,
//   title = "",
//   description = "",
//   image = "",
//   forcedRedirectEnabled = false
// }) => {
//   const link = new links.DynamicLink(`${BASE}/${path}`, DOMAIN).android
//     .setPackageName("com.wrench")
//     .ios.setBundleId("cc.wrench.app")
//     .ios.setCustomScheme("wrench")
//     .social.setTitle(title)
//     .social.setDescriptionText(description)
//     .social.setImageUrl(image)
//     .navigation.setForcedRedirectEnabled(forcedRedirectEnabled);
//
//   return links().createShortDynamicLink(link, "SHORT");
// };
