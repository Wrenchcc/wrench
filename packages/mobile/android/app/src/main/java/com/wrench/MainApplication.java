package com.wrench;

import android.app.Application;

import com.yonahforst.rnpermissions.RNPermissionsPackage;
import io.sentry.RNSentryPackage;
import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.medialibrary.MediaLibraryPackage;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import cl.json.RNSharePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.<Package>asList(
      new ReactAdapterPackage(),
      new ConstantsPackage(),
      new PermissionsPackage(),
      new FileSystemPackage(),
      new MediaLibraryPackage()
    ), Arrays.<SingletonModule>asList());

    @Override
    protected ReactGateway createReactGateway() {
      ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

      return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
      return BuildConfig.DEBUG;
    }

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
      return mCallbackManager;
    }

    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RNPermissionsPackage(),
      new ModuleRegistryAdapter(mModuleRegistryProvider),
      new RNSentryPackage(),
      new NetInfoPackage(),
      new AsyncStoragePackage(),
      new RNCWebViewPackage(),
      new LinearGradientPackage(),
      new FBSDKPackage(mCallbackManager),
      new ReactNativeConfigPackage(),
      new ReactVideoPackage(),
      new SplashScreenReactPackage(),
      new RNCameraPackage(),
      new RNDeviceInfo(),
      new RNSharePackage(),
      new ReanimatedPackage(),
      new RNGestureHandlerPackage(),
      new RNFirebasePackage(),
      new RNFirebaseAnalyticsPackage(),
      new RNFirebaseMessagingPackage(),
      new RNFirebaseNotificationsPackage(),
      new RNFirebaseLinksPackage(),
      new FastImageViewPackage()
      );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
    }
}
