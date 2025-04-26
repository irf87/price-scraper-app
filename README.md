This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Intro

This is the app client of [Price scraper server](https://github.com/irf87/prices-scraper)

## Step 1: Start the Metro Server


```bash
yarn start
```

## Step 2: Start your Application


### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


# Run storybook
```bash
yarn run storybook:web
```

# To generate apk

### create assets folder in the current project (only if doesn't exist)
```bash
$ mkdir android/app/src/main/assets
```

### execute this to avoid errors cleaning react-native cache

```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ --reset-cache
```

### create bundle script (if you already install in local react-native, omit npx)
```bash
$ npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

### execute command to run android to create debug apk (if you already install in local react-native, omit npx)
```bash
$ npx react-native run-android
```

### change to android folder
```bash
$ cd android
```

### build debug apk
```bash
$ ./gradlew assembleDebug
```

### install app
```bash
$ ./gradlew :app:installDebug
```

### the apk new apk is in below path:

/android/app/build/outputs/apk/debug

## Icon Configuration

### Android
The project is already configured to use Material Icons from `react-native-vector-icons`. The configuration is done in `android/app/build.gradle`.

### iOS
To ensure icons work properly on iOS:

1. Make sure the following fonts are listed in `ios/PriceScrapperApp/Info.plist` under `UIAppFonts`:
```xml
<key>UIAppFonts</key>
<array>
    <string>MaterialIcons.ttf</string>
    <string>MaterialCommunityIcons.ttf</string>
</array>
```

2. Run the following commands to link the fonts:
```bash
cd ios
pod install
cd ..
```

### Building APK for Android
When building the APK for Android, the icons will be automatically included in the build. No additional steps are required.

To generate a release APK:
```bash
cd android
./gradlew assembleRelease
```
The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`
