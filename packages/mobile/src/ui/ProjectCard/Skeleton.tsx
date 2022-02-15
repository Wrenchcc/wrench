import React from 'react'
import Skeleton from 'ui/Skeleton'
import { height } from './index'

export const ProjectCardSkeleton: React.FC = ({ style = {} }) => {
  return <Skeleton width={'100%'} height={height} radius={0} style={style} />
}

export default ProjectCardSkeleton
