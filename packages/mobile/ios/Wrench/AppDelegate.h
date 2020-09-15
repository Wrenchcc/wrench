#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeDelegate.h>

#import <UMCore/UMAppDelegateWrapper.h>

@import UserNotifications;

@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@end