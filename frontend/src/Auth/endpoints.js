const endpoints = {
  authentication:{
     register : "/api/v1/auth/register",
     login : "/api/v1/auth/login"
  },
  product:{
    getAllProduct:"/api/v1/product/All-product"
  },
  orders:{
     getAllOrders:"/api/v1/orders/my-orders"
  },
  wallet:{
     walletData:"/api/v1/wallet/get-config"
  }
}


export default endpoints;

