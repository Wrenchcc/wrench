import { NAVIGATION } from '../../constants'

export default {
  container: {
    backgroundColor: 'white',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 10000,
  },
  header: {
    marginTop: NAVIGATION.STATUS_BAR_HEIGHT,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    height: NAVIGATION.TOP_BAR_HEIGHT,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  left: {
    alignItems: 'flex-start',
    flex: 2,
  },
  right: {
    alignItems: 'flex-end',
    flex: 2,
  },
}
