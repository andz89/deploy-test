 
import {  useQuery,useMutation } from '@apollo/client'
import {  useParams} from "react-router-dom"
import { GET_CLIENT } from '../queries/clientQueries'
import {  GET_PROJECTS } from '../queries/projectsQueries'
import AddProject from "../components/AddProject";
import EditProject from "../components/EditProject";
import DeleteModal from '../components/DeleteModal';
import { useState } from "react";
import {  FaPlus, FaUser,FaTrash,FaEdit } from "react-icons/fa";
 

import { DELETE_PROJECT } from "../mutations/clientMutation";
const ClientPage = () => {
  const [addProjectModal, addProjectModalStatus] = useState(false);
  const [editProject, editProjectStatus] = useState(false);
  const [projectId, projectIdStatus] = useState();
const [deleting, setDeleting] = useState("")
 

  const {id} = useParams()
  const { loading , data, error} = useQuery(GET_CLIENT, {
    variables:{id}
  })
 
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    // refetchQueries: [{ query: GET_CLIENT, variables: { id: id }}],
    

    update(cache, { data: { deleteProject } }) {
      const { client } = cache.readQuery({
        query: GET_CLIENT,
        variables: { id: id },
      });
    
      cache.writeQuery({
        query: GET_CLIENT,
        variables: { id: id },
        data: {
         
          client: {
            ...client,
            projects: client.projects.filter(project => project.id !==  deleteProject.id),
         
          },
        },

       
      });
    },
  });
  const handleConfirm = async(data)=>{
  
    if(data === 'true'){
      console.log('tugma')
    await  deleteProject({  variables: { id: deleting }})
      setDeleting("")
    }else{
      setDeleting("")
    }

   
  }
  const onDelete = async (id)=>{

 setDeleting(id)
  
 
  }
  const onEdit = (id)=>{
    projectIdStatus(id)
    editProjectStatus(true)
  }
  if(loading ) return  <p>Loading ....</p>
  if(error) return  <p>Someting Went Wrong</p>

  return (
    <div >
       {deleting && <DeleteModal handleConfirm={handleConfirm} />}
         { addProjectModal && <AddProject modalStatus={addProjectModalStatus} clientId={data.client.id} />}
         { editProject && <EditProject modalStatus={editProjectStatus} projectId={projectId} />}

    <div className="bg-white p-2 rounded-lg   absolute w-full   p-5 ">
    <div className="flex justify-end gap-2 w-full" onClick={()=>addProjectModalStatus(true) }>
            <div className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 cursor-pointer flex items-center gap-2"  >
            <FaPlus size="1em" />  Add Project
            </div>
            
          </div>
      <div>
        <div className=" w-full bg-white p-2 rounded-lg shadow-md">
         
          {loading &&
          <div className="flex justify-center w-full items-center h-[180px]"> <p>Loading</p></div>
          
           }
          {data && 
           <>
          <div className="flex  mb-5 items-end gap-1">    <FaUser  size="4rem" className='border-slate-500 border-4 p-1 rounded-full text-slate-500' />  <h2 className='text-3xl font-semibold  '>CLient Information </h2 > </div>
          <label className="  font-semibold mb-4">Client Name: </label>
          <h3  >
          {data.client.name}
          </h3>
          <label className="  font-semibold mb-4">  Email: </label>
          <h3  >
          {data.client.email}
          </h3>
          <label className="  font-semibold mb-4">  Phone: </label>
          <h3  >
          {data.client.phone}
          </h3>
          <br />
        
          {data.client.projects.map((project) => (
              <div key={project.id}> 
              <hr className="border-2 my-5"/>
            <div >
              <div className='w-full flex justify-end'>
              <button
            className="bg-slate-500 py-1 px-2 m-1 rounded flex justify-center items-center gap-1"
            onClick={()=> onEdit(project.id)}
          >
            <FaEdit className="text-gray-100" /> <h2 className='font-semibold text-white'>Edit Project </h2> 
          </button> 
              <button
            className="bg-rose-500 py-1 px-2 m-1 rounded flex justify-center items-center gap-2"
            onClick={()=> onDelete(project.id)}
          >
            <FaTrash className="text-gray-100" /> <h2 className='font-semibold text-white'>Delete Project </h2> 
          </button>  
          
              </div>
            
              <label className="  font-semibold mb-4">Project Name: </label><h3>{project.name}</h3>
              <label className="  font-semibold mb-4">Description:</label> <p> {project.description}</p>
              <label className="  font-semibold mb-4">Status:</label>   <span className="text-xs bg-yellow-400 rounded p-1">
            {project.status}
          </span>
            </div>
           
            </div>
          ))}

         
          </>}
       
        </div>
      </div>
    </div>
 
  </div>
  )
}

export default ClientPage
