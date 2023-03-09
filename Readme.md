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

## Expand 


## Project Principles

- Don't use default exports/ imports across components
- Don't use unnecessary indexes
- utils should be kept in self containing modules
- ...more to come
