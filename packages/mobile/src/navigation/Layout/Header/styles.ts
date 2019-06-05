import { NAVIGATION } from '../../constants'

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    width: '100%',
  },
  background: {
    backgroundColor: 'white',
    zIndex: 10,
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
    marginTop: NAVIGATION.STATUS_BAR_HEIGHT,
    backgroundColor: 'white',
  },
  inner: {
    height: NAVIGATION.TOP_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
}
