<div align="center">
<img src="https://wrench.cc/assets/img/logo.svg" width="20%">

### Post, explore and learn together.

</div>

This is the main monorepo codebase of [Wrench](https://wrench.cc). Every single line of code that's not packaged into a reusable library is in this repository.

[![Build status](https://build.appcenter.ms/v0.1/apps/3bfdd500-bdf4-4c30-a6fc-bc44d95820e9/branches/master/badge)](https://appcenter.ms)
[![Build status](https://build.appcenter.ms/v0.1/apps/6d77ac98-c606-43d1-9182-30715cea1a44/branches/master/badge)](https://appcenter.ms)
[![Build Status](https://dev.azure.com/wrenchcc/Wrench/_apis/build/status/Wrench)](https://dev.azure.com/wrenchcc/Wrench/_build)

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
