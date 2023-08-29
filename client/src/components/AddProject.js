import { useState } from "react";
import { ADD_PROJECT } from "../mutations/clientMutation";
import { useMutation } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { GET_CLIENT } from "../queries/clientQueries";

const AddProject = ({ modalStatus, clientId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState("new");
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: name,
      description: description,
      status: status,
      clientId: clientId,
    },

    // refetchQueries: [{ query: GET_CLIENT, variables: { id: clientId } }],
    update(cache, { data: { addProject } }) {
      const { client } = cache.readQuery({
        query: GET_CLIENT,
        variables: { id: clientId },
      });

      cache.writeQuery({
        query: GET_CLIENT,
        variables: { id: clientId },
        data: {
          client: {
            ...client,
            projects: [...client.projects, { addProject }],
          },
        },
      });
    },
  });
  if (addProject) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please complete form");
    }
    addProject();
    setName("");
    setDescription("");
    setStatus("new");
    modalStatus(false);
  };

  return (
    <div className="bg-slate-500 bg-opacity-20  w-full h-full z-50 fixed top-0 left-0 ">
      <div className="bg-white p-2 rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96   ">
        <div>
          <div className="max-w-md mx-auto bg-white p-2 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">New Project</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Poject Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 px-4 py-2 w-full border-2  rounded-md  focus:outline-none focus:ring focus:ring-teal-800 focus:ring-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-medium"
                >
                  Project Status
                </label>

                <select
                  className="mt-1 px-4 py-2 w-full border-2  rounded-md  focus:outline-none focus:ring focus:ring-teal-800 focus:ring-1"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  {" "}
                  <option value="new">Not Stared</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium"
                >
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  className="mt-1 px-4 py-2 w-full border-2  rounded-md  focus:outline-none focus:ring focus:ring-teal-800 focus:ring-1 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 w-full">
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer"
                >
                  Submit
                </button>
                <div
                  className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600 cursor-pointer"
                  onClick={() => modalStatus(false)}
                >
                  Cancel
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
