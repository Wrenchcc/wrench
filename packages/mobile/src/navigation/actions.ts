import { Navigation } from 'react-native-navigation'

let componentId

export function navigateTo(screen, { options, ...params }) {
  Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: params,
      options,
    },
  })
}

export function showModal(screen, { options, ...params }) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: screen,
            passProps: params,
            options,
          },
        },
      ],
    },
  })
}

export function dismissModal() {
  Navigation.dismissModal(componentId)
}

export function navigate(id) {
  componentId = id

  return (screen, { options, ...params }) => Navigation.push(id, {
    component: {
      name: screen,
      passProps: params,
      options,
    },
  })
}
