import React from 'react'
import Skeleton from 'ui/Skeleton'
import { height } from './styles'

export const ProjectCardSkeleton: React.FC = () => {
  return <Skeleton width={'100%'} height={height} radius={0} />
}

export default ProjectCardSkeleton
