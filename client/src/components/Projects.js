import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const Projects = ({ data }) => {
  return (
    <>
      <div className=" shadow-md border border-slate-400 w-72  mt-4 rounded p-5">
        <div className="flex w-full justify-end">
          {" "}
          <Link
            to={`/client/${data.clientId}`}
            className="bg-slate-300 p-1 rounded text-sm font-semibold"
          >
            View
          </Link>{" "}
        </div>

        <div>
          <label className="font-bold">Project Name:</label>
          <h5>{data.name}</h5>
          <label className="font-bold">Description:</label>
          <p className="text-sm">{data.description}</p>
          <label className="font-bold">Status:</label>
          <br></br>
          <span className="text-xs bg-yellow-400 rounded p-1">
            {data.status}
          </span>
          <br></br>
          <div className="font-bold  mt-3">Client Name: </div>
          <h4 className="text-slate-700 text-sm flex gap-2 items-center">
            {" "}
            <FaUser />
            {data.client.name}
          </h4>
        </div>
      </div>
    </>
  );
};

export default Projects;
