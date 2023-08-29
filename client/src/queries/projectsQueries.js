import { gql } from "@apollo/client";

//for displaying all projects
const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
      clientId
      client {
        id
        name
      }
    }
  }
`;
//for deleting project
const GET_PROJECT = gql`
  query getProject($id: String!) {
    project(id: $id) {
      id
      name
      description
      status
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };
