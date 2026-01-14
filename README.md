# Minimal Capacitor / Auth0 iOS In-App Browser Issue Reproduction
Capacitor and Auth0 work perfectly in Android and Browser builds. However, our app has run into issues passing review for the iOS store. The stated issue is that the application cannot open the Safari instance for authentication, but must instead use the embedded safari controller within the App, so that the context never leaves the app. Using the configurations provided in documentation by Capacitor / Auth0 result in the full Safari browser being used for authentication. This is a minimal reproduction of that issue so that we can receive direction regarding how to fix it.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
