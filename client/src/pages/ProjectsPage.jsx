import { useQuery } from "@apollo/client";

 
import { GET_PROJECTS } from "../queries/projectsQueries";
import Projects from "../components/Projects"

const ProjectsPage = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS);
  
    if (loading) return <p>Loading ....</p>;
    if (error) return <p>Something went wrong</p>;
  return (
    <div className="flex flex-wrap gap-3 justify-start p-2">
        {data.projects.map((project)=>(
            <Projects key={project.id} data={project} />
        ))}
       
    </div>
  )
}

export default ProjectsPage
