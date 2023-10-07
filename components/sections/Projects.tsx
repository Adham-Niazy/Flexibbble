import { ProjectInterface, ProjectSearch } from '@/common.types';
import { ProjectCard } from '../UI';

type Props = {
  projects: ProjectSearch
}

async function Projects({ projects }: Props) {
  
  const projectsToDisplay = projects?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <p className="no-result-text text-center">No projects found 🪹, be the first one to create projects in this category 🎨🚀.</p>
    )
  }

  return (
    <section className="projects-grid">
      {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
        <ProjectCard
          key={`${node?.id}`}
          id={node?.id}
          image={node?.image}
          title={node?.title}
          name={node?.createdBy.name}
          avatarUrl={node?.createdBy.avatarUrl}
          userId={node?.createdBy.id}
        />
      ))}
    </section>
  )
}

export default Projects