// @ts-check
import { BaseMods } from "../ExpoConfigPlugins.mjs";
import { makeFilePathModifier, makeNullProvider } from "../provider.mjs";

const modifyFilePath = makeFilePathModifier("node_modules/.generated/ios");

const nullProvider = makeNullProvider();

// https://github.com/expo/expo/blob/93cd0503117d5a25f8b80ed7b30ec5bed3a67c24/packages/@expo/config-plugins/src/plugins/withIosBaseMods.ts
const expoProviders = BaseMods.getIosModFileProviders();

/** @type {typeof expoProviders} */
const defaultProviders = {
  dangerous: expoProviders.dangerous,
  appDelegate: modifyFilePath(
    expoProviders.appDelegate,
    "ReactTestApp/AppDelegate.swift"
  ),
  expoPlist: nullProvider,
  xcodeproj: modifyFilePath(
    expoProviders.xcodeproj,
    "ReactTestApp.xcodeproj/project.pbxproj"
  ),
  infoPlist: modifyFilePath(expoProviders.infoPlist, "ReactTestApp/Info.plist"),
  entitlements: modifyFilePath(
    expoProviders.entitlements,
    "ReactTestApp/ReactTestApp.entitlements"
  ),
  podfileProperties: nullProvider,
};

// `react-native-test-app` files
defaultProviders["sceneDelegate"] = modifyFilePath(
  expoProviders.appDelegate,
  "ReactTestApp/SceneDelegate.swift"
);

export function getIosModFileProviders() {
  return defaultProviders;
}
