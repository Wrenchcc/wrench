import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from 'ui/constants'

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
    marginTop: STATUS_BAR_HEIGHT,
  },
  subTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  actions: {
    marginLeft: 10,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
}
