# Gospel Initiative App

## Setup

### Setup project dependencies

Run the following commands:
```bash
npm install
npx expo start
```

### Setup for development with server
1. Run `ipconfig` on terminal and find `IPv4 Address`.
2. Update `gospel-initiative` `.env` file in project directory (make if necessary). 
   - Add `SERVER_URL` parameter set to this url at port `3000`.
   - Add `PRODUCTION_MODE` set to false.
3. In `gospel-initiative` project directory, run `npx run start` to start the Expo server.
4. Go to `gospel-initiative-backend` repo and run `node app.js` in project directory.
   - Also run `npx prisma studio` for Prisma Studio DB editor.

### Misc Commands
- Upgrade Expo SDK
   - `npm install expo@latest`
   - `npx expo install --fix`
- Install NPM Check updates:
   - `npm install -g npm-check-updates`
- Upgrade NPM Dependencies to latest versions (uses npm-check-updates)
   - `ncu -u`
- Install NPM Dependencies
   - `npm i `
- Check NPM Versions
   - `npm ls webpack`

### Development Commands
- Frontend-specific
   - Start project: `npx expo start`
      - `-c` to clear the cache. You may need this after making updates to .ENV.
   - Run on Android: `npm run android`
   - Run on iOS: `npm run ios`
   - Run on Web: `npm run web`
- Backend-specific
   - Run Prisma Studio Editor: `npx prisma studio`.
- Expo
   - List out most recent iOS build: `eas build:list --platform ios --limit 1`

### Development Builds
- For Android development builds (better than Expo Go):
   - `eas build --platform android --profile development`
   - Build the device and then use the QR code to install on the app.
   - It'll take you to the Expo web page and from there, download the
   APK build and tap it in the Downloads section.
   - Also login to the development build.
   - You'll have to run `npx expo start` while the app is open for it to get picked up.
   - If it doesn't pick up, try putting in the URL manually. This is what fixed it for me.
   I also had to run `ipconfig` to double check and make sure that the right IP address is
   being used.

Notes:
- The phone device you are trying to connect to must be on the same WiFi network as the laptop.
- The `.env` file doesn't get updated unless you restart the expo server.

## Deployment

### Publish to EAS servers
- `eas update`: Publishes your latest JavaScript and assets to EAS Update servers for instant delivery to users—no app store review required.

### Create a development build
This command initializes your project for EAS Build by creating an eas.json configuration file if it doesn't already exist. It will prompt you to select which platforms (iOS, Android) you want to configure builds for.
- `eas build:configure`

- `eas build --profile development --platform ios`
This command triggers a build on the EAS servers for the iOS platform which will prompt you to install on devices on your profile.

### Upload to the App Store.

[Link](https://docs.expo.dev/build/setup/)

1. `npm install -g eas-cli`: Installs the EAS CLI globally on your machine, which is the command-line interface tool used to interact with Expo Application Services.
2. `eas whoami`: Checks if you are currently logged in to your Expo account via EAS CLI. This confirms your identity and permissions for building and submitting apps.
   - If you are not yet logged in, run `eas login`.
3. `eas build:configure`: Sets up your project for EAS Build by creating or updating the eas.json configuration file and selecting platforms to build for, as described above.
   - Choose which platforms to build on.
4. `eas build`: Initiates a build process on EAS servers for the configured platforms and profiles. This creates the actual app binaries (IPA for iOS, APK or AAB for Android) that you can submit to app stores.
5. `eas submit`: Upload existing builds on the EAS server (produced by `eas build`) to upload the app to app stores.
   - For TestFlight: `eas submit --platform ios`
   - For Google Play: `eas submit --platform android`

## Troubleshooting

### "The Gospel Initiative" Beta Has Expired
- This happened for me after not using the project for a while.
- Run `npx expo install expo@latest` to install the latest Expo version.
- Upgrade dependencies to match new Expo version: `npx expo install --fix`.


### App timeout
- My development build was installed on my iOS device but I wasn't able to connect any way - through QR code, manually, etc. When the development server option would show up on the dev build app, nothing would happen and it would timeout the connection.
- I realized it was because I instal anti-virus software Avast that was doing stuff to my Windows firewall. I had to remove it and restart my computer and I was able to connect again.
- So if you're getting app timeouts, it may be because of something firewall related. Especially if it seems to be working when launching on web.

### No value was provided for the parameter 'scope'" error when registering for Apple push key
- My fix: `npm install -g eas-cli`

### `cannot find native module ExpoDevice`
- I tried to install the module with `npx expo install expo-device` along with a bunch of other
dependencies, but it wouldn't go through. Tried removing node_modules and package-lock.json, tried
different versions, didn't work.
- I had to (1) **rebuild the eas development build** and (2) **uninstall and reinstall** the development build app on my phone. I removed it and re-installed the new build with the expo-devices dependency with the QR code I can find when trying to install from the Expo developer website. Then it worked.

### Android Build Error: Define Runtime Version
- CommandError: You're currently using the bare workflow, where runtime version policies are not supported. You must set your runtime version manually. For example, define your runtime version as "1.0.0", not {"policy": "appVersion"} in your app config. https://docs.expo.dev/eas-update/runtime-versions
- Solution: Change `app.config.js` to make sure that it's using `runtimeVersion` as a version string and not an object {"policy": "appVersion"} which it was before.

### Android Build Errors
- `https://github.com/expo/expo/issues/27650`
- This fixed some bad build errors for me: 
- `npx expo install --fix`
- `rm -rf node_modules/ package-lock.json`
- `npm i`
- `eas build --platform android`

## Notes

### How do I reinstall development builds?
- If the development build has been deleted, you can find the QR Code to install it again on the
Expo development website. Go to your profile, go to 'Development Builds', click the most recent
one, and click the blue `Install` button.
- Once it gets installed, try to run `npx expo start` with the app open. If it doesn't work, try manually
putting in the server url:8081 into the manual. It will ask if you want to let the app discover devices
in your network. Allow this and try the manual method again.

### Expo Go
Expo Go should only be used for experimental releases. Just use a development build whenever possible. You get more of the native tools and the app itself
on your phone, and it's the recommended way to develop apps.