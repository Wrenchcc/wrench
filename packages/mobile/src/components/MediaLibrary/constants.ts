import { Dimensions } from 'react-native'
import { TOP_BAR_HEIGHT, STATUS_BAR_HEIGHT } from 'navigation'

const { width, height } = Dimensions.get('screen')

export const HEADER_HEIGHT = TOP_BAR_HEIGHT
export const CROP_AREA = width
export const DRAG_BAR = 80
export const CROP_FULLY_UP = -CROP_AREA + DRAG_BAR - (HEADER_HEIGHT + STATUS_BAR_HEIGHT)
export const CROP_FULLY_DOWN = 0

export const CROP_TIMING_DURATION = 150

export const INITIAL_PAGE_SIZE = 32
export const PAGE_SIZE = 60

export const TIMING_DURATION = 250
export const ALBUM_FULLY_DOWN = height + width
export const ALBUM_INNER_HEIGHT = height - HEADER_HEIGHT
export const ALBUM_FULLY_UP = STATUS_BAR_HEIGHT
export const ALBUM_WIDTH = width
export const CAMERA_SIZE = width
