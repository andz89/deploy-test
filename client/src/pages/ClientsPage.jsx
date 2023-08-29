import { useQuery } from "@apollo/client";
import { useState } from "react";
import ClientRow from "../components/ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";

import { FaPlus } from "react-icons/fa";
import AddClient from "../components/AddClient";

const ClientsPage = () => {
  const [addClientModal, addClientModalStatus] = useState(false);

  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p>Loading ....</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {addClientModal && <AddClient modalStatus={addClientModalStatus} />}

      <div className="mx-5 mt-3 flex justify-end">
        <button
          className="bg-gray-400 px-3 py-3 drop-shadow-md rounded "
          onClick={() => addClientModalStatus(true)}
        >
          <FaPlus className="text-white " />
        </button>
      </div>

      <table className="min-w-full text-left text-sm font-light  ">
        <thead className="border-b-4  font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Email
            </th>
            <th scope="col" className="px-6 py-4">
              Phone
            </th>
            <th scope="col" className="px-6 py-4">
              Projects
            </th>
            <th scope="col" className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClientsPage;
