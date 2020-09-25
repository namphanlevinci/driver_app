import gql from 'graphql-tag';

export const ORDER_LIST = gql`
  query {
    deliveryOrders {
      new {
        order_number
      }
      recently {
        order_number
      }
    }
  }
`;
