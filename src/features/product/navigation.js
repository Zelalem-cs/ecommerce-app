import React from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "./page/cart-detail";
import ProductDetailPage from "./page/product-detail";
import ProductListPage from "./page/product-list";
import { getCategories } from "./store/product-query";
class ProductNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navigate: null };
  }
  componentDidMount() {
    const { getCategories } = this.props;
    getCategories().then((response) =>
      this.setState({ navigate: response.data.categories[0].name })
    );
  }
  render() {
    return (
      <Routes>
        {this.state.navigate !== null && (
          <Route
            path="/"
            element={<Navigate replace to={`${this.state.navigate}`} />}
          />
        )}
        <Route index path=":id" element={<ProductListPage />} />
        <Route path="detail/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    );
  }
}
const mapStateToProps = (state) => ({
 //
});
const mapDispatch = {
  getCategories: getCategories.initiate,
};
export default connect(mapStateToProps, mapDispatch)(ProductNavigation);
