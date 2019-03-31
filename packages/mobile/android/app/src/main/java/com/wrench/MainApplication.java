package com.wrench;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.sentry.RNSentryPackage;
import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.imagemanipulator.ImageManipulatorPackage;
import expo.modules.medialibrary.MediaLibraryPackage;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import org.reactnative.camera.RNCameraPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import cl.json.RNSharePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import expo.modules.imagemanipulator.ImageManipulatorPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.<Package>asList(
     new ReactAdapterPackage(),
     new ConstantsPackage(),
     new PermissionsPackage(),
     new FileSystemPackage(),
     new MediaLibraryPackage(),
     new ImageManipulatorPackage()
  ), Arrays.<SingletonModule>asList());


  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider),
          new RNSentryPackage(),
          new NetInfoPackage(),
          new AsyncStoragePackage(),
          new RNCWebViewPackage(),
          new LinearGradientPackage(),
          new RNReactNativeHapticFeedbackPackage(),
          new FBSDKPackage(mCallbackManager),
          new ReactNativeConfigPackage(),
          new ReactVideoPackage(),
          new SplashScreenReactPackage(),
          new RNScreensPackage(),
          new RNCameraPackage(),
          new RNDeviceInfo(),
          new RNSharePackage(),
          new RNGestureHandlerPackage(),
          new ReanimatedPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAnalyticsPackage(),
          new RNFirebasePerformancePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage(),
          new RNFirebaseLinksPackage(),
          new FastImageViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
