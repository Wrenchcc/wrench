import { navigationConstants } from 'navigation/constants'

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    width: '100%',
    backgroundColor: 'white',
  },
  containerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    marginTop: navigationConstants.statusBarHeight,
  },
  inner: {
    height: navigationConstants.topBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
}
