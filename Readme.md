# reInvest React Native App

## Running the project

- Clone this project

```
git clone http://gitlab.mdevelopers.com/react-native/mclimbers.git / or using SSH
```

- Run `yarn` in root folder to install the dependencies.
- Run `yarn start`.
- Run `yarn ios` / `yarn android` (in another terminal tab) which will start building the app and it will open a new ios / android emulator once finished

## Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app
  - `constants`: Folder to store any kind of constant
  - `locales`: Folder to store the languages files.
  - `navigation`: Folder to store the navigators.
  - `screens`: Folder that contains all your application screens.
  - `App.tsx`: Main component.
- `index.js`: Entry point of your application as per React-Native standards.

## Creating new path aliases for subdirectories inside `src` folder

- Create subdirectory inside `src` folder
- Specify new path in `tsconfig.json` -> `compilerOptions` -> `paths`

```
"@EXAMPLE/*": ["src/EXAMPLE/*"],
```

- Specify new path in `babel.config.js` -> `plugins` -> `alias`

```
'@EXAMPLE': './src/EXAMPLE',
```

- Run `npm start --reset-cache`

## ENV files

This project uses React-native-config to provide specific env variables 

In order to run application we need three env files : 
- .env.development 
- .env.staging 
- .env.production
Each specific file should consist aws specific environmental variables
Change flavour in android studio or schema to build proper version 

## Expand

## Project Principles

- Don't use default exports/ imports across components
- Don't use unnecessary indexes
- utils should be kept in self containing modules
- use index for main folder component instead of component name file convention
  - index.tsx for main component
  - types.ts for types
  - styles.ts for styling
- ...more to come


# Deployment 

### iOS
- Project is using xCode cloud for iOS deployment 
- In order to change any values in env secrets , there is a need to convert desired .env file into base64 and overwrite xcode cloud secret.
  - there are separate workflows for staging and integration environments
  - don't obfuscate secret for ENV_FILE since it will lead to improper decoded values
- All necessary certs and profiles for production deployment can be delivered by your supervisor

### Android (TBD)
- Project uses local.properties to store credentials to release.keystore, ask supervisor for those two files
  - local.properties  this should be placed in `./android/` folder
  - release.keystore this should be placed in `./android/app` folder
- Since whole deployment should be handled by cicd pipeline , this should be used only while manually deployment process , and should be avoided
- For development debug.keystore is provided
