import DataLoader from 'dataloader'
import Project from '../models/Project'

export const createProjectLoader = () =>
  new DataLoader(async (keys: string[]) => {
    const projects = await Project.findByIds(keys)

    const projectMap: { [key: string]: Project } = {}

    projects.forEach(p => {
      projectMap[p.id] = p
    })

    return keys.map(k => projectMap[k])
  })
