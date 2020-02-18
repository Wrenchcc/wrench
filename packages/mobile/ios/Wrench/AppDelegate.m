#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
#import "RNSplashScreen.h"
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import "SDImageCodersManager.h"
#import <SDWebImageWebPCoder/SDImageWebPCoder.h>
#import <AVFoundation/AVFoundation.h>

#if DEBUG
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@import Firebase;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  #if DEBUG
    InitializeFlipper(application);
  #endif
  
  [FIROptions defaultOptions].deepLinkURLScheme = @"wrench";
  [FIRApp configure];
  [RNFirebaseNotifications configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];

  // Register WebP format support
  [SDImageCodersManager.sharedManager addCoder:SDImageWebPCoder.sharedCoder];

  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"packages/mobile/index" fallbackResource:nil];

  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];

  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];

  [RNSplashScreen show];

  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
      openURL:url
      sourceApplication:sourceApplication
      annotation:annotation];
}

// Push Notifications
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
                                                       fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}

-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {

  [[RNFirebaseMessaging instance] didReceiveRemoteNotification:response.notification.request.content.userInfo];
  completionHandler();
}

// Deep links
- (BOOL)application:(UIApplication *)application
  openURL:(NSURL *)url
  options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]]
         || [RNGoogleSignin application:application openURL:url options:options];

  if (!handled) {
      handled = [RCTLinkingManager application:application openURL:url options:options];
  }

  return handled;
}

// Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
    return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                  restorationHandler:restorationHandler];
}

@end
