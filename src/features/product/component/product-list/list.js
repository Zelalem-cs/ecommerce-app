import React from "react";
import { getCategories} from "../../store/query";
import ProductCard from "../product-card/product-card";
import { connect } from "react-redux";
import "./list.css";
import {setCart} from '../../../../shared/store/slices/cart-slice'
import { NavLink } from "react-router-dom";
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currency:null};
  }
  
  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
    this.setState({currency:JSON.parse(localStorage.currency)})
  }
 
  render() {
    return (
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
                  <NavLink key={idx} to={`/detail/${product.id}`}>
                    <ProductCard
                      name={`${product.brand} ${product.name}`}
                      url={product.gallery[0]}
                      sign={product.prices.map((price)=>{if(price.currency.symbol===this.state.currency) return price.currency.symbol; return null} )}
                      amount={product.prices.map((price)=>{if(price.currency.symbol===this.state.currency) return price.amount; return null} )}
                      order={(e) => e && this.props.setCartItem(product)}
                      inStock={product.inStock}
                    />
                  </NavLink>
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
});

const mapDispatch ={
    getCategories: getCategories.initiate,
    setCartItem: setCart
  };
export default connect(mapStateToProps, mapDispatch)(List);
