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
      address
      firstname
      id
      lastname
      restaurant
      token
    }
  }
`;

export const SHIPPING = gql`
  mutation($id: Int!) {
    shipping(id: $id) {
      result
    }
  }
`;

export const ARRIVED = gql`
  mutation($id: Int!) {
    arrived(id: $id) {
      result
    }
  }
`;

export const BOM = gql`
  mutation($id: Int!) {
    bom(id: $id) {
      result
    }
  }
`;

export const COMPLETE = gql`
  mutation($id: Int!) {
    complete(id: $id) {
      result
    }
  }
`;
