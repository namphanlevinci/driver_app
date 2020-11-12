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
  mutation($username: String!, $password: String!, $fcmToken: String!) {
    generateStaffToken(
      username: $username
      password: $password
      fcmToken: $fcmToken
    ) {
      address
      firstname
      id
      lastname
      restaurant
      token
      accept_order
    }
  }
`;

export const SIGN_UP = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    registerStaff(
      firstname: $firstname
      lastname: $lastname
      email: $email
      username: $username
      password: $password
    ) {
      result
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

export const ACCEPT_SHPPING = gql`
  mutation($type: Int!) {
    acceptShipping(type: $type) {
      result
    }
  }
`;

export const MARK_READ = gql`
  mutation($id: Int!) {
    markReadNotification(id: $id) {
      result
    }
  }
`;
