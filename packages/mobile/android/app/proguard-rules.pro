# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html
-verbose
-optimizationpasses 9
-repackageclasses ''
-allowaccessmodification
-mergeinterfacesaggressively
-dontpreverify
-optimizations !code/simplification/arithmetic

# Add any project specific keep options here:
-keepattributes SourceFile,LineNumberTable
# https://www.guardsquare.com/en/products/proguard/manual/examples#annotations
-keepattributes *Annotation*
-keepattributes EnclosingMethod
# Retain generic type information for use by reflection by converters and adapters.
-keepattributes Signature
# Retain declared checked exceptions for use by a Proxy instance.
-keepattributes Exceptions

# Print out a list of what we're preserving.
#
# WARNING! FLAGS IS NOT SUPPORTED BY ANDROID STUDIO EMBEDDED OBFUSCATION TOOL!
#
#-printseeds

#
# uncomment parameter if you need dump of bytecode left after optimization
# Can be used for verifying remove of unneeded code during optimization phase
#
#-dump build/outputs/mapping/dump.txt

#
# Disabling obfuscation is useful if you collect stack traces from production crashes
# (unless you are using a system that supports de-obfuscate the stack traces).
# Uncomment only for debug purposes.
#
#-dontobfuscate

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep public class * extends androidx.versionedparcelable.VersionedParcelable
-keep public class * implements androidx.versionedparcelable.VersionedParcelable
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.UIProp <fields>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

# for low-memory cases debugging
-keep enum com.facebook.common.memory.MemoryTrimType { *; }

-dontwarn com.facebook.react.**
-dontnote com.facebook.react.**

# TextLayoutBuilder uses a non-public Android constructor within StaticLayout.
# See libs/proxy/src/main/java/com/facebook/fbui/textlayoutbuilder/proxy for details.
-dontwarn android.text.StaticLayout

# SoLoader

-keep class com.facebook.soloader.** { *; }
-keepclassmembers class com.facebook.soloader.SoLoader {
     static <fields>;
}

# okhttp

-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**
-dontnote okhttp3.**

# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**
-dontnote okio.**

# Glide, https://github.com/bumptech/glide
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

-dontwarn com.bumptech.glide.**
-dontnote com.bumptech.glide.**

# Kotlin

-keep class kotlin.** { *; }
-keep class kotlin.Metadata { *; }
-keepclassmembers class **$WhenMappings {
    <fields>;
}
-keepclassmembers class kotlin.Metadata {
    public <methods>;
}
-assumenosideeffects class kotlin.jvm.internal.Intrinsics {
    static void checkParameterIsNotNull(java.lang.Object, java.lang.String);
}
-dontwarn kotlin.**
-dontnote kotlin.internal.**
-dontnote kotlin.jvm.internal.**

# Kotlin co-routines
# https://www.youtube.com/watch?v=EOjq4OIWKqM
#
-keepclassmembers class kotlinx.** {
    volatile <fields>;
}

# Entry Point

-keep class com.wrench.MainApplication { *; }
-keep class com.facebook.react.devsupport.DevSupportManagerImpl { *; }

# Modules

-dontnote com.brentvatne.react.**
-dontnote com.facebook.fresco.**
-dontnote com.BV.LinearGradient.**
-dontnote com.BV.LinearGradient.**
-dontnote com.google.gson.internal.**
-dontnote com.facebook.datasource.**

-dontnote com.facebook.cache.**
-dontnote com.facebook.imagepipeline.**

# Custom

-dontwarn io.invertase.**
-dontnote com.google.firebase.**
-dontnote com.google.android.gms.**
-dontnote com.google.common.util.concurrent.**

-keep public class com.dylanvann.fastimage.** {*;}
-dontnote com.dylanvann.fastimage.**
-dontnote com.swmansion.**
-dontwarn com.swmansion.**
-dontnote com.facebook.datasource.**
-dontwarn com.facebook.datasource.**
-keep class com.wrench.BuildConfig { *; }

# Startup

-keep class com.google.firebase.provider.FirebaseInitProvider
-keep class android.arch.lifecycle.ProcessLifecycleOwnerInitializer

# Force keeping of Fragment inheritors constructors
-keepclassmembers public class * extends android.support.v4.app.Fragment {
   public <init>(...);
}

-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

-keep class com.facebook.react.turbomodule.** { *; } 