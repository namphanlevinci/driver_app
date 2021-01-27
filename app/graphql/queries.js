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
  query($id: Int!) {
    orderDetail(id: $id) {
      address
      created_at
      firstname
      grand_total
      phone
      id
      lastname
      order_number
      payment_method
      status
      customer_comment
      customer_rating
      customer_phone
      note
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

export const DELIVERY_ORDER = gql`
  query {
    deliveryOrders {
      orders {
        order_number
        id
        created_at
        grand_total
        status
        firstname
        lastname
        payment_method
        address
      }
    }
  }
`;

export const RECENTLY_ORDER = gql`
  query($page: Int!) {
    recentlyOrders(currentPage: $page, pageSize: 10) {
      orders {
        order_number
        id
        created_at
        grand_total
        status
        firstname
        lastname
        payment_method
        address
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

export const APP_STATUS = gql`
  query {
    appStatus {
      result
    }
  }
`;

export const NOTIFICATION_LIST = gql`
  query($type: String!) {
    notifications(type: $type) {
      list {
        id
        title
        content
        order_id
        is_read
      }
    }
  }
`;

export const GET_SHIPPER_INFO = gql`
  query {
    getShipperInfo {
      accept_order
      address
      firstname
      id
      lastname
      restaurant
      token
      user_name
    }
  }
`;
