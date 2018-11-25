import projectsConnection from './projectsConnection'
import projectCategories from './projectTypes'

export default [
  { ...projectsConnection, category: projectCategories[0] },
  { ...projectsConnection, category: projectCategories[1] },
  { ...projectsConnection, category: projectCategories[3] },
]
