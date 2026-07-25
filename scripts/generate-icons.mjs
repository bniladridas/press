import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// Book-inspired app icon: closed book with spine, subtle page lines, and serif P
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#FAFAF8"/>
  <g transform="translate(108, 72)">
    <rect x="0" y="0" width="240" height="320" rx="8" fill="#2C2C2C"/>
    <rect x="16" y="0" width="224" height="320" rx="6" fill="#3A3A3A"/>
    <line x1="24" y1="0" x2="24" y2="320" stroke="#4A4A4A" stroke-width="1.5"/>
    <line x1="50" y1="48" x2="208" y2="48" stroke="#555" stroke-width="1" stroke-linecap="round"/>
    <line x1="50" y1="72" x2="180" y2="72" stroke="#4A4A4A" stroke-width="1" stroke-linecap="round"/>
    <line x1="50" y1="260" x2="208" y2="260" stroke="#4A4A4A" stroke-width="1" stroke-linecap="round"/>
    <text x="132" y="180" font-family="Georgia, 'Times New Roman', serif" font-size="140" font-weight="bold" fill="#FAFAF8" text-anchor="middle" dominant-baseline="central">P</text>
  </g>
</svg>`;

const ADAPTIVE_FG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432">
  <g transform="translate(88, 42)">
    <rect x="0" y="0" width="200" height="268" rx="7" fill="#2C2C2C"/>
    <rect x="13" y="0" width="187" height="268" rx="5" fill="#3A3A3A"/>
    <line x1="20" y1="0" x2="20" y2="268" stroke="#4A4A4A" stroke-width="1.5"/>
    <line x1="42" y1="40" x2="174" y2="40" stroke="#555" stroke-width="1" stroke-linecap="round"/>
    <line x1="42" y1="60" x2="150" y2="60" stroke="#4A4A4A" stroke-width="1" stroke-linecap="round"/>
    <line x1="42" y1="218" x2="174" y2="218" stroke="#4A4A4A" stroke-width="1" stroke-linecap="round"/>
    <text x="110" y="150" font-family="Georgia, 'Times New Roman', serif" font-size="116" font-weight="bold" fill="#FAFAF8" text-anchor="middle" dominant-baseline="central">P</text>
  </g>
</svg>`;

const ADAPTIVE_BG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432">
  <rect width="432" height="432" fill="#FAFAF8"/>
</svg>`;

const SPLASH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1284 2778">
  <rect width="1284" height="2778" fill="#FAFAF8"/>
  <g transform="translate(492, 1100)">
    <rect x="0" y="0" width="300" height="400" rx="12" fill="#2C2C2C"/>
    <rect x="20" y="0" width="280" height="400" rx="10" fill="#3A3A3A"/>
    <line x1="30" y1="0" x2="30" y2="400" stroke="#4A4A4A" stroke-width="2"/>
    <line x1="60" y1="60" x2="260" y2="60" stroke="#555" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="60" y1="90" x2="220" y2="90" stroke="#4A4A4A" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="60" y1="330" x2="260" y2="330" stroke="#4A4A4A" stroke-width="1.5" stroke-linecap="round"/>
    <text x="165" y="220" font-family="Georgia, 'Times New Roman', serif" font-size="170" font-weight="bold" fill="#FAFAF8" text-anchor="middle" dominant-baseline="central">P</text>
  </g>
  <text x="642" y="1620" font-family="Georgia, 'Times New Roman', serif" font-size="80" font-weight="bold" fill="#8A8A82" text-anchor="middle" letter-spacing="6">PRESS</text>
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
  await sharp(Buffer.from(ICON_SVG)).resize(512, 512).png().toFile(join(androidPlay, "ic_launcher_playstore.png"));

  // Android adaptive icon layers
  const drawable = join(androidRes, "drawable");
  mkdirSync(drawable, { recursive: true });
  await sharp(Buffer.from(ADAPTIVE_FG)).resize(432, 432).png().toFile(join(drawable, "ic_launcher_foreground.png"));

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
