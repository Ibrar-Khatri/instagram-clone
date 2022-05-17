import {gql} from '@apollo/client';

export const GetUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
    }
  }
`;
