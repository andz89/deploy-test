import { useState } from "react";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const AddClient = ({ modalStatus }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = (e) => {
    if (e.target.classList.contains("modal")) {
      modalStatus(false);
    }
  };

  const [addClient] = useMutation(ADD_CLIENT, {
    // refetchQueries: [{ query: GET_CLIENTS }],

    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      console.log(clients);
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: {
            __typename: "Client",
            clients: { clients: [...clients, addClient] },
          },
        },
      });
    },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return alert("Please complete form");
    }
    await addClient({ variables: { name: name, email: email, phone: phone } });
    setName("");
    setEmail("");
    setPhone("");
    modalStatus(false);
  };

  if (addClient) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }
  return (
    <>
      <div
        className="bg-slate-500 bg-opacity-50  w-full h-full z-10 fixed top-0 left-0 modal"
        onClick={handleClick}
      >
        <div className="bg-white p-2 rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96   ">
          <div>
            <div className="max-w-md mx-auto bg-white p-2 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Add Client</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium"
                  >
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 px-4 py-2 w-full border-2  rounded-md  focus:outline-none focus:ring focus:ring-teal-800 focus:ring-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    name="email"
                    className="mt-1 px-4 py-2 w-full border-2  rounded-md  focus:outline-none focus:ring focus:ring-teal-800 focus:ring-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium"
                  >
                    phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    id="phone"
                    name="phone"
                    className="mt-1 px-4 py-2 w-full border-2  rounded-md  focus:outline-none focus:ring focus:ring-teal-800 focus:ring-1"
                  />
                </div>

                <div className="flex justify-end gap-2 w-full">
                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer"
                  >
                    Add
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
    </>
  );
};

export default AddClient;
