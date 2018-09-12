<div align="center">
<img src="https://wrench.cc/assets/img/logo.svg" width="20%">

### Post, explore and learn together.

</div>

This is the main monorepo codebase of [Wrench](https://wrench.cc). Every single line of code that's not packaged into a reusable library is in this repository.

[![Build status](https://build.appcenter.ms/v0.1/apps/646c8a36-99ac-40ba-8a96-4dba6fb97949/branches/master/badge)](https://appcenter.ms) [![Build status](https://build.appcenter.ms/v0.1/apps/7b502e9f-2718-436d-a885-0f84a9668312/branches/master/badge)](https://appcenter.ms)
[![Build Status](https://dev.azure.com/pontus0714/wrench-api/_apis/build/status/pontusab.wrench-app)](https://dev.azure.com/pontus0714/wrench-api/_build/latest?definitionId=1)
[![Build Status](https://dev.azure.com/pontus0714/wrench-web/_apis/build/status/pontusab.wrench-app)](https://dev.azure.com/pontus0714/wrench-web/_build/latest?definitionId=2)

## What is Wrench?

### Vision

To be the goto community for people that like to build and keep track of their motorcycle build progress.

### Codebase

#### Technologies

- **Full-stack JavaScript**: We use Node.js to power our servers, and React to power our frontend and mobile apps. Almost all of the code you'll touch in this codebase will be JavaScript.

Here is a list of all the big technologies we use:

- **PostgreSQL**: Data storage
- **GraphQL**: API, powered by the entire Apollo toolchain
- **React**: Frontend and mobile apps

#### Folder structure

```sh
wrench/
├── api        # API server
├── mobile     # Mobile apps
├── shared     # Shared JavaScript code
└── web        # Web app
```

### Mobile apps

#### Setup

`yarn && react-native link && yarn pod:install`

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
