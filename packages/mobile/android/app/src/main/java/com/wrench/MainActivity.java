package com.wrench;

import android.os.Bundle;
import androidx.annotation.Nullable;
import android.content.Intent;
import android.content.res.Configuration;

import com.reactnativenavigation.NavigationActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
      switch (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) {
        case Configuration.UI_MODE_NIGHT_YES:
            setTheme(R.style.DarkTheme);

            break;
        case Configuration.UI_MODE_NIGHT_NO:
            setTheme(R.style.LightTheme);
            break;
        default:
            setTheme(R.style.LightTheme);
      }

      SplashScreen.show(this, true);
      super.onCreate(savedInstanceState);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      Intent intent = new Intent("onConfigurationChanged");
      intent.putExtra("newConfig", newConfig);
      sendBroadcast(intent);
    }
}
