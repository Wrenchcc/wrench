<div align="center">
<img src="https://edge-files.wrench.cc/static/email/logo.jpg?w=60&h=60&dpr=3" alt="Wrench">

![Deploy Web](https://github.com/Wrenchcc/wrench/workflows/Deploy%20Web/badge.svg)
![Deploy UI](https://github.com/Wrenchcc/wrench/workflows/Deploy%20UI/badge.svg)
![Deploy Apps](https://github.com/Wrenchcc/wrench/workflows/Deploy%20Apps/badge.svg)
![Deploy API](https://github.com/Wrenchcc/wrench/workflows/Deploy%20API/badge.svg)
![Deploy Admin](https://github.com/Wrenchcc/wrench/workflows/Deploy%20Admin/badge.svg)
![Deploy Codepush](https://github.com/Wrenchcc/wrench/workflows/Deploy%20Codepush/badge.svg)

### Post, explore and learn together.

</div>

This is the main monorepo codebase of [Wrench](https://wrench.cc). Every single line of code that's not packaged into a reusable library is in this repository.

## What is Wrench?

The goto community for people that like to build and keep track of their motorcycle build progress.

#### Technologies

- **Full-stack JavaScript**: We use Node.js to power our servers, and React to power our frontend and mobile apps. Almost all of the code you'll touch in this codebase will be JavaScript.

Here is a list of all the big technologies we use:

- **PostgreSQL**: Data storage
- **GraphQL**: API, powered by the entire Apollo toolchain
- **React**: Frontend and mobile apps


#### Architecture
<img width="1810" alt="aws" src="https://user-images.githubusercontent.com/655158/97475756-ee880580-194d-11eb-8ac8-1be06330c7f8.png">



#### Folder structure

```sh
wrench/
├── api            # API server
├── common         # Shared code
├── translations   # Project translations
├── email          # Email service
├── resizer        # Resize service
├── mobile         # Mobile apps
├── ui             # UI library
└── web            # Web app
```

### Mobile apps

> Make sure you have Xcode, yarn and Cocoapods installed

#### Setup

From the project root run:

`yarn`

`cd packages/mobile/ios && pod install`

#### Commands

- `yarn start:packager`
- `yarn start:ios`
- `yarn start:android`
- `yarn emulator:start`
- `yarn emulator:create`
- `yarn emulator:ensureready`
- `yarn run:android`
- `yarn run:ios`
- `yarn assets:transform:svg`
- `yarn storybook:start`
- `yarn storybook:create`
- `yarn translations:create`
- `yarn storybook`
