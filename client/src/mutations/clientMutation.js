import { gql } from "@apollo/client";

const DELETE_CLIENT = gql`
  mutation deleteClient($id: String!) {
    deleteClient(id: $id) {
      id
      projects {
        id
      }
    }
  }
`;
const DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      id
      name
      clientId
    }
  }
`;
const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: String!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
    }
  }
`;
const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: String!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
    }
  }
`;

export {
  DELETE_CLIENT,
  ADD_CLIENT,
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
};
