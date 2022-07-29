import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { setCart } from "../../../../shared/store/slices/cart-slice";
import { getCategories } from "../../store/product-query";
import ProductCard from "../product-card/product-card";
import "./list.css";
class List extends React.Component {
  constructor(props) {
    super(props);
    this.setCartItem=this.setCartItem.bind(this);
    this.state = {
      navigate: null,
      productSpecification: {
        selectedAttributes: [],
      },
    };
  }
  setCartItem(product){
    this.props.setCartItem({
      ...product,
      selectedAttributes: [],
      quantity: 1,
    });
  }
  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  render() {
    return this.state.navigate !== null ? (
      <Navigate to={this.state.navigate} />
    ) : (
      <div>
        {this.props.data?.isLoading ? (
          <div
            style={{ height: "100%" }}
            className="flex items-center justify-center"
          >
            <img src="assets/icons/loading-spin.svg" alt="loading..." />
          </div>
        ) : (
          this.props.data?.data?.categories?.map((category, idx) => (
            <div key={idx}>
              <div className="category-name">{category.name}</div>
              <div className="product-container">
                {category?.products.map((product, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      product.attributes.length > 0
                        && this.setState({ navigate: `/detail/${product.id}` })
                    }
                  >
                    <ProductCard
                      name={`${product.brand} ${product.name}`}
                      url={product.gallery[0]}
                      sign={product.prices.map((price) => {
                        if (
                          price.currency.symbol === this.props.currency.symbol
                        )
                          return price.currency.symbol;
                        return null;
                      })}
                      amount={product.prices.map((price) => {
                        if (
                          price.currency.symbol === this.props.currency.symbol
                        )
                          return price.amount;
                        return null;
                      })}
                      order={(e) =>
                        e && product.attributes.length > 0
                          ? this.navigate(`/detail/${product.id}`)
                          : this.setCartItem(product)
                      }
                      inStock={product.inStock}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: getCategories.select()(state),
  currency: state.currencySlice.currency,
});

const mapDispatch = {
  getCategories: getCategories.initiate,
  setCartItem: setCart,
};
export default connect(mapStateToProps, mapDispatch)(List);
