import DataLoader from 'dataloader'
import Project from '../models/Project'

type BatchProject = (ids: string[]) => Promise<Project[]>

const batchProjects: BatchProject = async ids => {
  const projects = await Project.findByIds(ids)

  const projectMap: { [key: string]: Project } = {}

  projects.forEach(u => {
    projectMap[u.id] = u
  })

  return ids.map(id => projectMap[id])
}

export const createProjectLoader = () => new DataLoader<string, Project>(batchProjects)
