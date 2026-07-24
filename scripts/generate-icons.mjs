import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#FAFAF8"/>
  <text x="256" y="340" font-family="Georgia, 'Times New Roman', serif" font-size="320" font-weight="bold" fill="#2C2C2C" text-anchor="middle">P</text>
</svg>`;

const ADAPTIVE_FG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432">
  <text x="216" y="290" font-family="Georgia, 'Times New Roman', serif" font-size="270" font-weight="bold" fill="#2C2C2C" text-anchor="middle">P</text>
</svg>`;

const ADAPTIVE_BG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432">
  <rect width="432" height="432" fill="#FAFAF8"/>
</svg>`;

const SPLASH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1284 2778">
  <rect width="1284" height="2778" fill="#FAFAF8"/>
  <text x="642" y="1340" font-family="Georgia, 'Times New Roman', serif" font-size="160" font-weight="bold" fill="#2C2C2C" text-anchor="middle">Press</text>
</svg>`;

const ANDROID_SIZES = {
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192,
};

const IOS_SIZES = {
  "AppIcon-20": 20,
  "AppIcon-20@2x": 40,
  "AppIcon-20@3x": 60,
  "AppIcon-29": 29,
  "AppIcon-29@2x": 58,
  "AppIcon-29@3x": 87,
  "AppIcon-40": 40,
  "AppIcon-40@2x": 80,
  "AppIcon-40@3x": 120,
  "AppIcon-60@2x": 120,
  "AppIcon-60@3x": 180,
  "AppIcon-76": 76,
  "AppIcon-76@2x": 152,
  "AppIcon-83.5@2x": 167,
  "AppIcon-Small-50": 50,
  "AppIcon-Small-50@2x": 100,
  "AppIcon-Small": 29,
  "AppIcon-Small@2x": 58,
  "AppIcon-Small@3x": 87,
  "AppIcon": 1024,
};

async function generate() {
  const root = join(import.meta.dirname, "..");

  // Android icons
  const androidRes = join(root, "android/app/src/main/res");
  for (const [density, size] of Object.entries(ANDROID_SIZES)) {
    const dir = join(androidRes, `mipmap-${density}`);
    mkdirSync(dir, { recursive: true });
    await sharp(Buffer.from(ICON_SVG)).resize(size, size).png().toFile(join(dir, "ic_launcher.png"));
    await sharp(Buffer.from(ICON_SVG)).resize(size, size).png().toFile(join(dir, "ic_launcher_round.png"));
  }

  // Android Play Store icon
  const androidPlay = join(androidRes, "mipmap-xxxhdpi");
  await sharp(Buffer.from(ICON_SVG)).resize(512, 512).png().toFile(join(androidPlay, "ic_launcher-playstore.png"));

  // Android adaptive icon layers
  const drawable = join(androidRes, "drawable");
  mkdirSync(drawable, { recursive: true });
  await sharp(Buffer.from(ADAPTIVE_FG)).resize(432, 432).png().toFile(join(drawable, "ic_launcher_foreground.png"));
  await sharp(Buffer.from(ADAPTIVE_BG)).resize(432, 432).png().toFile(join(drawable, "ic_launcher_background.png"));

  // iOS icons
  const iosAssets = join(root, "ios/App/App/Assets.xcassets/AppIcon.appiconset");
  mkdirSync(iosAssets, { recursive: true });

  const contents = [];
  for (const [name, size] of Object.entries(IOS_SIZES)) {
    const scale = name.includes("@3x") ? 3 : name.includes("@2x") ? 2 : 1;
    const filename = `${name}.png`;
    await sharp(Buffer.from(ICON_SVG)).resize(size, size).png().toFile(join(iosAssets, filename));
    contents.push({
      size: `${size / scale}x${size / scale}`,
      idiom: name === "AppIcon" ? "ios-marketing" : "universal",
      filename,
      scale: `${scale}x`,
    });
  }
  writeFileSync(join(iosAssets, "Contents.json"), JSON.stringify({ images: contents, info: { version: 1, author: "xcode" } }, null, 2));

  // iOS splash screen
  const iosSplash = join(root, "ios/App/App/Assets.xcassets/SplashScreen.imageset");
  mkdirSync(iosSplash, { recursive: true });
  await sharp(Buffer.from(SPLASH_SVG)).resize(1284, 2778).png().toFile(join(iosSplash, "splashscreen.png"));
  writeFileSync(
    join(iosSplash, "Contents.json"),
    JSON.stringify(
      {
        images: [{ idiom: "universal", filename: "splashscreen.png", scale: "1x" }],
        info: { version: 1, author: "xcode" },
      },
      null,
      2
    )
  );

  // Android splash
  const androidSplash = join(androidRes, "drawable");
  await sharp(Buffer.from(SPLASH_SVG)).resize(1284, 2778).png().toFile(join(androidSplash, "splash.png"));

  console.log("Icons and splash screens generated.");
}

generate().catch(console.error);
