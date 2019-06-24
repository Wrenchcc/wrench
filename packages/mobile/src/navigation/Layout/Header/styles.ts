import { NAVIGATION } from '../../constants'

export default {
  background: {
    backgroundColor: 'white',
    zIndex: 10,
  },
  container: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 10000,
  },
  containerBackground: {
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  header: {
    backgroundColor: 'white',
    marginTop: NAVIGATION.STATUS_BAR_HEIGHT,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    height: NAVIGATION.TOP_BAR_HEIGHT,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
}
