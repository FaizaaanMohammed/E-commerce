const endpoints = {
  authentication:{
     register : "/api/v1/auth/register",
     login : "/api/v1/auth/login"
  },
  product:{
    getAllProduct:"/api/v1/product/All-product"
  },
  orders:{
     getAllOrders:"/api/v1/orders/my-orders",
     postOrder:"/api/v1/orders/create-order"
  },
  wallet:{
     walletData:"/api/v1/wallet/get-config"
  },
  userDetails:{
     getSingleUserDetails : "/api/v1/userList/users"
  },
  cart:{
     add:"/api/v1/cart/add-cart",
     getCart:"/api/v1/cart/get-cart",
     cartRemove:"/api/v1/cart/remove-item"
  },
  reviews:{
     add_review:"/api/v1/reviews/add-review",
     get_review:"/api/v1/reviews/product-review"
  }
}


export default endpoints;

