export default ({ config }) => ({
    expo: {
        name: "The Gospel Initiative",
        slug: "gospel-initiative",
        version: "1.1.2",
        runtimeVersion: "1.1.2",
        orientation: "portrait",
        icon: "./assets/images/gospel-initiative/app-logo.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        splash: {
            image: "./assets/images/gospel-initiative/gospel-initiative-green.png",
            resizeMode: "contain",
            backgroundColor: "#d0e0e3",
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.redemption.gospelinitiative",
            infoPlist: {
                NSPhotoLibraryUsageDescription: "We need access to your photo library to allow you to upload photos.",
                ITSAppUsesNonExemptEncryption: false,
            }
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/gospel-initiative/app-logo.png",
                backgroundColor: "#d0e0e3",
            },
            softwareKeyboardLayoutMode: "pan",
            package: "com.redemption.gospelinitiative",    
            googleServicesFile: process.env.GOOGLE_SERVICES_JSON || './google-services.json'
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            "expo-asset",
            "expo-secure-store",
            "expo-font",
            "expo-speech-recognition",
            [
                "expo-calendar",
                {
                    "calendarPermission": "The Gospel Initiative app would like to add your action step event to your default calendar."
                }
            ]
        ],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            serverUrl: process.env.SERVER_URL || "https://gospel-initiative-712601afd046.herokuapp.com",
            production: process.env.PRODUCTION_MODE || false,
            eas: {
                projectId: "2ae65218-15d2-482e-8975-7143d6fb55aa",
            },
        },
        updates: {
            url: "https://u.expo.dev/2ae65218-15d2-482e-8975-7143d6fb55aa",
        },
        cli: {
            appVersionSource: "remote"
        },
        build: {
            preview: {
                distribution: "internal"
            },
            production: {
                autoIncrement: true
            }
        }
    },
});
