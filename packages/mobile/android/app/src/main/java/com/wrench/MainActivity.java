package com.wrench;

import android.os.Bundle;
// import android.os.Build;
// import android.view.WindowManager;
import androidx.annotation.Nullable;

import com.reactnativenavigation.NavigationActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
    SplashScreen.show(this);

    // https://dev.to/brunolemos/adding-notch-support-to-your-react-native-android-app-3ci3
    // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
    //     WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
    //     layoutParams.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
    //     getWindow().setAttributes(layoutParams);
    //     getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    //     getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
    // }

    super.onCreate(savedInstanceState);
  }
}
