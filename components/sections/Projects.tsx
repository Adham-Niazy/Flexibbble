import { ProjectInterface } from '@/common.types';
import { fetchAllProjects } from '@/lib/actions';
import { ProjectCard } from '../UI';

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  },
}

async function Projects() {
  const data = await fetchAllProjects() as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <p className="no-result-text text-center">No projects found, go create some first.</p>
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