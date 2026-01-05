# React Native User Authentication App

A secure and responsive mobile application for user authentication built with React Native, TypeScript, and React Navigation.

### Features

### Authentication
- User registration with email and password
- Secure login with email and password
- Form validation with real-time feedback
- Protected routes and navigation

### User Interface
- Clean, modern design with consistent theming
- Responsive layouts for all device sizes
- Loading states and error handling
- Toggle password visibility

### Security
- Secure credential storage
- Input validation
- Error handling and user feedback

## 🛠️ Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Watchman (for macOS users)

## 🚀 Getting Started

## Step 1. Clone the repository

```bash
git clone https://github.com/kamleshmanek/UserAuthenticationApp
cd UserAuthenticationApp
```

## Step 2: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.
