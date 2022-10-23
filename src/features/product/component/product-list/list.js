import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { setCart } from "../../../../shared/store/slices/cart-slice";
import { withRouter } from "../../../../shared/utility/url-param";
import { getCategory } from "../../store/product-query";
import ProductCard from "../product-card/product-card";
import "./list.css";
class List extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef(null);
    this.setCartItem = this.setCartItem.bind(this);
    this.state = {
      navigate: null,
      productSpecification: {
        selectedAttributes: [],
      },
    };
  }
 
  setCartItem(product) {
    this.props.setCartItem({
      ...product,
      selectedAttributes: [],
      quantity: 1,
    });
  }
  componentDidMount() {
    const { getCategory } = this.props;
    getCategory(this.props.params.id);
  }
  componentDidUpdate(prevProps) {
    const { getCategory } = this.props;
    if (prevProps.params.id !== this.props.params.id)
      getCategory(this.props.params.id);
  }

  render() {
    const { data, currency } = this.props;
    return this.state.navigate !== null ? (
      <Navigate to={this.state.navigate} />
    ) : (
      <div>
        {data?.isLoading ? (
          <div
            
            className="flex items-center justify-center loading-container"
          >
            <img src="assets/icons/loading-spin.svg" alt="loading..." />
          </div>
        ) : (
          <div>
            <div className="category-name">{data?.data?.category?.name}</div>
            <div className="product-container">
              {data?.data?.category?.products.map((product, idx) => (
                <div
                  key={idx}
                  
                >
                  <ProductCard
                  id={product.id}
                   ref={this.ref}
                    name={`${product.brand} ${product.name}`}
                    url={product.gallery[0]}
                    sign={product.prices.map((price) => {
                      if (price.currency.symbol === currency.symbol)
                        return price.currency.symbol;
                      return null;
                    })}
                    amount={product.prices.map((price) => {
                      if (price.currency.symbol === currency.symbol)
                        return price.amount.toFixed(2);
                      return null;
                    })}
                    order={() =>
                      product.attributes.length > 0
                        ? this.setState({ navigate: `/detail/${product.id}` })
                        : this.setCartItem(product)
                    }
                    inStock={product.inStock}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => ({
  data: getCategory.select(props.params.id)(state),
  currency: state.currencySlice.currency,
});

const mapDispatch = {
  setCartItem: setCart,
  getCategory: getCategory.initiate,
};
export default withRouter(connect(mapStateToProps, mapDispatch)(List));
