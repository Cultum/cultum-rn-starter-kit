# Cultum RN Starter Kit

This boilerplate currently includes.

- React Native
- React Navigation
- Redux
- TypeScript
- Styled Components

## How to use
````
npx react-native init <app-name> --template https://gitlab.com/cultum/rn-template.git

cd <app-name>

git init .
git add .
git commit -m "init"
git remote add origin <repository url>
git branch -M main
git push -u origin main
````

## Main commands

- `yarn ios` - run ios app
- `yarn android` - run android app
- `yarn compile` - run compile typescript
- `yarn lint` - run project linting
- `yarn format` - run project formatting
- `yarn clean/clean all` - cleans project by purging caches and modules, and reinstalling them again

## To start on android

1. Go to your android folder
2. Create a file local.properties
3. Open the file
4. Paste your Android SDK path depending on the operating system: `sdk.dir = /Users/USERNAME/Android/sdk` 

