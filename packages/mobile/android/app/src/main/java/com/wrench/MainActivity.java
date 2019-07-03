package com.wrench;

import android.os.Bundle;
import android.content.Intent;
import com.reactnativenavigation.NavigationActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {
  @Override
  // https://github.com/wix/react-native-navigation/issues/3102
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }
}
