package com.wrench;

import com.wrench.generated.BasePackageList;

import android.app.Application;
import android.util.Log;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;

import com.brentvatne.react.ReactVideoPackage;

import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationPackage;
import com.reactnativenavigation.react.NavigationReactNativeHost;

import com.microsoft.codepush.react.CodePush;

public class MainApplication extends NavigationApplication {

    private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), null);

    private final ReactNativeHost mReactNativeHost = new NavigationReactNativeHost(this) {
        @Override
        protected String getJSMainModuleName() {
            return "packages/mobile/index";
        }

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        public List<ReactPackage> getPackages() {
            ArrayList<ReactPackage> packages = new PackageList(this).getPackages();

            // Add unimodules
            List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
                new ModuleRegistryAdapter(mModuleRegistryProvider)
            );
            
            packages.addAll(unimodules);

            packages.add(new RNFirebaseAnalyticsPackage());
            packages.add(new RNFirebaseMessagingPackage());
            packages.add(new RNFirebaseNotificationsPackage());
            packages.add(new ReactVideoPackage());

            return packages;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}