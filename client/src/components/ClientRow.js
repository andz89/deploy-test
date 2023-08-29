import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { Link } from "react-router-dom";

import { useState } from "react";
const ClientRow = ({ client }) => {
  const [addProjectModal, addProjectModalStatus] = useState(false);
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });
  const onDelete = async () => {
    addProjectModalStatus(true);
    await deleteClient();
  };
  return (
    <>
      <tr className="border-b  dark:border-neutral-500 font-medium hover:bg-slate-200 transition-all duration-200 ease-in cursor-pointer ">
        <td className="whitespace-nowrap px-6 py-2 "> {client.name}</td>

        <td className="whitespace-nowrap px-6 py-2 ">{client.email}</td>
        <td className="whitespace-nowrap px-6 py-2 ">{client.phone}</td>

        <td className="whitespace-nowrap px-6 py-2 ">
          {" "}
          <Link
            to={`/client/${client.id}`}
            className="bg-cyan-600 text-white   p-1 m-1 rounded"
          >
            View Projects
          </Link>
        </td>

        <td className="whitespace-nowrap px-6 py-2 gap-2">
          {!addProjectModal && (
            <button
              className="bg-rose-500 p-1 m-1 rounded"
              onClick={() => onDelete()}
            >
              <FaTrash className="text-gray-100" />{" "}
            </button>
          )}
          {addProjectModal && <span>Deleting </span>}
        </td>
      </tr>
    </>
  );
};

export default ClientRow;
