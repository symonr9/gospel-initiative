export default ({ config }) => ({
    expo: {
        name: "gospel-initiative",
        slug: "gospel-initiative",
        version: "1.0.0",
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
            bundleIdentifier: "com.syb"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
            softwareKeyboardLayoutMode: "pan",
            package: "com.syborg9.gospelinitiative"
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
                    "calendarPermission": "The app needs to access your calendar."
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
        runtimeVersion: {
            policy: "appVersion",
        },
        updates: {
            url: "https://u.expo.dev/2ae65218-15d2-482e-8975-7143d6fb55aa",
        },
    },
});
