<div>
[![Wrench](https://wrench.cc/assets/img/logo.svg)](https://wrench.cc)
</div>

### Post, explore and learn.

To be the goto community for people that like to build and keep track of their motorcycle build progress.

[![Build status](https://build.appcenter.ms/v0.1/apps/646c8a36-99ac-40ba-8a96-4dba6fb97949/branches/master/badge)](https://appcenter.ms) [![Build status](https://build.appcenter.ms/v0.1/apps/7b502e9f-2718-436d-a885-0f84a9668312/branches/master/badge)](https://appcenter.ms)

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
