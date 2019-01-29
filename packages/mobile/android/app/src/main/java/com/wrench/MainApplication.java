package com.wrench;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactVideoPackage(),
          new SplashScreenReactPackage(),
          new RNSharePackage(),
          new RNScreensPackage(),
          new ReanimatedPackage(),
          new LinearGradientPackage(),
          new RNReactNativeHapticFeedbackPackage(),
          new RNGestureHandlerPackage(),
          new RNFirebasePackage(),
          new FBSDKPackage(),
          new FastImageViewPackage(),
          new RNDeviceInfo(),
          new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
          new RNCameraPackage()
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
