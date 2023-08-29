import { gql } from "@apollo/client";
//display all clients
const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;
//get specific client and its projects
const GET_CLIENT = gql`
  query getClient($id: String!) {
    client(id: $id) {
      id
      name
      email
      phone
      projects {
        id
        name
        description
        status
      }
    }
  }
`;
export { GET_CLIENTS, GET_CLIENT };
