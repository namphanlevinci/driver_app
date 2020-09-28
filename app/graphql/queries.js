import gql from 'graphql-tag';

export const ORDER_LIST = gql`
  query {
    deliveryOrders {
      new {
        address
        created_at
        firstname
        grand_total
        id
        lastname
        order_number
        payment_method
        status
      }
      recently {
        address
        created_at
        firstname
        grand_total
        id
        lastname
        order_number
        payment_method
        status
      }
    }
  }
`;

export const ORDER_DETAILS = gql`
  query ($id: Int!){
    orderDetail(id: $id) {
        address
        created_at
        firstname
        grand_total
        id
        lastname
        order_number
        payment_method
        status
        items {
          name
          qty
          price
          options {
            name
            qty
            price
          }
        }
    }
  }
`;
