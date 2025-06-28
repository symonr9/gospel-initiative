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
   - Start project for Expo Go: `npx expo start --go`
      - The development build uses the build as it shows in the App Store/Google Play store, the app itself loads.
      If you just want it to load for Expo Go, include the `--go` flag.
   - Run on Android: `npm run android`
   - Run on iOS: `npm run ios`
   - Run on Web: `npm run web`
- Backend-specific
   - Run Prisma Studio Editor: `npx prisma studio`.

Notes:
- The phone device you are trying to connect to must be on the same WiFi network as the laptop.
- The `.env` file doesn't get updated unless you restart the expo server.

## Deployment

### Publish to EAS servers
- `eas update`: Publishes your latest JavaScript and assets to EAS Update servers for instant delivery to users—no app store review required.

### Create a development build (accessible through Expo Go app)
This command initializes your project for EAS Build by creating an eas.json configuration file if it doesn't already exist. It will prompt you to select which platforms (iOS, Android) you want to configure builds for.
- `eas build:configure`

- `eas build --profile development --platform ios`
This command triggers a build on the EAS servers for the iOS platform, accessible through the Expo Go app.

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

### No usable found error when trying to scan QR Code
- I had to use `npx expo start --go` to initiate the server to work with Expo Go.

### "The Gospel Initiative" Beta Has Expired
- This happened for me after not using the project for a while.
- Run `npx expo install expo@latest` to install the latest Expo version.
- Upgrade dependencies to match new Expo version: `npx expo install --fix`.