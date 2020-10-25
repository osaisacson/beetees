# Beetees

iOS/Android app for structuring life

## get started

Make sure you first have installed:

- XCode
- Android Studio
- NPM
- Expo CLI

Then...
`git clone https://github.com/osaisacson/beetees.git`
`git init`
`npm install`
`npm start`
...and start apple and android simulators

## when using as a template

- Clone the project
- Create a new firebase db: https://console.firebase.google.com/
- Go to firebase console > Project overview cogwheel > Project settings and create new iOS, Android and web configs (under tab 'General', button 'Add app')
- Select the iOS app and download the GoogleService-Info.plist and select the Android app to download the google-services.json file, then add these to the root of your project
- Select the Web app, and under 'Firebase SDK snippet' select 'Config'. This is for reference in the next step.
- In your code editor, go to example.env in the root of your project and update the account details with the ones you find in 'Config' above.
- Change the name of example-env to env.js and (IMPORTANT) include it in your gitignore file.
- Delete all specific firebase files in root, these will be generated in the next step.
- `firebase init` - select installing all options. Follow all defaults apart for functions, do not overwrite these.
- In the firebase console > authentication set up your authentication for how you prefer your users sign in
