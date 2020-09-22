import gql from 'graphql-tag';

// create customer account mutation
export const SIGN_OUT = gql`
  mutation {
    revokeStaffToken {
      result
    }
  }
`;

export const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    generateStaffToken(username: $username, password: $password) {
      token
    }
  }
`;
