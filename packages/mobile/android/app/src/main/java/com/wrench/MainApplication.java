package com.wrench;

import android.app.Application;
import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;

import cl.json.RNSharePackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;
import com.imagepicker.ImagePickerPackage;
import io.sentry.RNSentryPackage;

import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativeimagemanipulator.ImageManipulatorPackage;
import com.reactnativemedialibrary.MediaLibraryPackage;
import com.reactnativedevicelocale.DeviceLocalePackage;

import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.RNFirebasePackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

public class MainApplication extends NavigationApplication {
    @Override
    protected ReactNativeHost createReactNativeHost() {
        return new NavigationReactNativeHost(this) {
            @Override
            protected String getJSMainModuleName() {
                return "packages/mobile/index";
            }
        };
    }

    @Override
    public boolean isDebug() {
      return BuildConfig.DEBUG;
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        List<ReactPackage> packages = new ArrayList<>();

        packages.add(new AsyncStoragePackage());
        packages.add(new FastImageViewPackage());
        packages.add(new FBSDKPackage());
        packages.add(new LinearGradientPackage());
        packages.add(new NetInfoPackage());
        packages.add(new ReactNativeConfigPackage());
        packages.add(new ReactVideoPackage());
        packages.add(new ReanimatedPackage());
        packages.add(new RNCameraPackage());
        packages.add(new RNCWebViewPackage());
        packages.add(new RNFirebaseAnalyticsPackage());
        packages.add(new RNFirebaseMessagingPackage());
        packages.add(new RNFirebaseNotificationsPackage());
        packages.add(new RNFirebasePackage());
        packages.add(new RNGestureHandlerPackage());
        packages.add(new RNGoogleSigninPackage());
        packages.add(new RNSharePackage());
        packages.add(new SplashScreenReactPackage());
        packages.add(new RNPermissionsPackage());
        packages.add(new ImagePickerPackage());
        packages.add(new ImageManipulatorPackage());
        packages.add(new MediaLibraryPackage());
        packages.add(new DeviceLocalePackage());
        packages.add(new RNSentryPackage());

        return packages;
    }
}