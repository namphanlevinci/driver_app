import gql from 'graphql-tag';

export const ORDER_LIST = gql`
  query {
    deliveryOrders {
      new {

        id
  
      }
      recently {
      
        id
 
      }
    }
  }
`;
