import React from "react";
import { Route } from "react-router-dom";
import ProductDetailPage from "./page/product-detail";
import ProductListPage from "./page/product-list";
import { Routes } from "react-router-dom";
import Cart from "./page/cart-detail";
class ProductNavigation extends React.Component {
  render() {
    return (
      <Routes>
        <Route index element={<ProductListPage />} />
        <Route path="detail/:id" element={<ProductDetailPage/>} />
        <Route path="cart" element={<Cart/>} />
      </Routes>
    );
  }
}
export default ProductNavigation;
