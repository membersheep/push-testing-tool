# push-testing-tool
![Dependencies](https://david-dm.org/membersheep/push-testing-tool.svg)

This simple tool allows you to send simple iOS and Android push notifications to your testing devices.
## Configuration
Before starting the application you should fill the config.json with your app's information. Here's an example with some useful informations:
```
{
  "ios": {
    "token": {
    // Create and download an APNs Auth Key in your developer.apple.com account page.
    // This is not app-dependent and you can use the same key for multiple apps.
      "key": "APNS_AuthKey_file.p8",
    // You can read the key id in the auth key filename after creating it.
      "keyId": "10digitsId",
    // You can find your teamID in your developer.apple.com account page, under Account->Membership.
      "teamId": "10digitsId"
    },
    "production": false,
    // You can find/create an app identifier in your developer.apple.com account page, under Idenfiers.
    "appId": "com.app.id",
    // These are the registration ids generated when you accept to receive push notifications from your app in your device.
    "deviceTokens": [
      "device_token"
    ]
  },
  "android": {
  // This is the web api key of you project. You can find it the firebase console in your project settings.
    "authKey": "auth_key",
  // These are the registration ids generated when you accept to receive push notifications from your app in your device.
    "deviceTokens": [
      "device_token"
    ]
  }
}
```
## Usage
1. Install the dependencies ```npm install```
2. Start the app ```npm start``` and
3. Follow the prompt messages.
