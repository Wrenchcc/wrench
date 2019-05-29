import { NAVIGATION } from '../../constants'

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
  header: {
    marginTop: NAVIGATION.STATUS_BAR_HEIGHT,
  },
  inner: {
    height: NAVIGATION.TOP_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
}
