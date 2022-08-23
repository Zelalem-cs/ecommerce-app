import React from "react";
import { connect } from "react-redux";
import { removeProductFromCart, setCart } from "../../store/slices/cart-slice";
import "./shopping-cart.css";

class ShoppingCart extends React.Component {
  componentDidMount() {
    let total = 0;
    const { cartItem } = this.props;
    cartItem?.map((item) => (total = total + item.prices[0].amount));
  }
  render() {
    const { cartItem, currency, removeCartItem, setCartItem } = this.props;
    return (
      <div className="shopping-cart-container">
        {cartItem.map((item, idx) => {
          return (
            <div className="shopping-cart-item flex justify-between" key={idx}>
              <div className="item-description">
                <div className="item-name">{`${item.brand} ${item.name}`}</div>
                <div className="item-price">
                  {item.prices.map(
                    (price) =>
                      price.currency.symbol === currency.symbol &&
                      `${price.currency.symbol} ${price.amount}`
                  )}
                </div>

                <div className="item-attribute-container">
                  {item.attributes.map((attribute, index) => {
                    return (
                      <div style={{ width: "100%" }} key={index}>
                        <div className="cart-item-attribute-value">
                          <div>{attribute.name}:</div>

                          <div
                            style={{ width: "100%", gap: "5px" }}
                            className="flex items-center "
                          >
                            {attribute.items.map((attributeItem, idx) =>
                              attribute.type === "swatch" ? (
                                <div
                                  key={idx}
                                  className="flex justify-center"
                                  style={{
                                    border:
                                      item.selectedAttributes.some(
                                        (attr) =>
                                          attr.name === attribute.name &&
                                          attr.value === attributeItem.value
                                      ) && "solid 1px #5ECE7B",
                                    padding:
                                      item.selectedAttributes.some(
                                        (attr) =>
                                          attr.name === attribute.name &&
                                          attr.value === attributeItem.value
                                      ) && "2px",
                                  }}
                                >
                                  <div
                                    key={idx}
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      backgroundColor: attributeItem.value,
                                    }}
                                    onClick={() =>
                                      this.setAttribute({
                                        name: attribute.name,
                                        value: attributeItem.value,
                                      })
                                    }
                                  ></div>
                                </div>
                              ) : (
                                <div
                                  key={idx}
                                  className="cart-item-attribute-text flex items-center justify-center"
                                  style={{
                                    backgroundColor:
                                      item.selectedAttributes?.some(
                                        (attr) =>
                                          attr.name === attribute.name &&
                                          attr.value === attributeItem.value
                                      )
                                        ? "black"
                                        : "",
                                    color: item.selectedAttributes?.some(
                                      (attr) =>
                                        attr.name === attribute.name &&
                                        attr.value === attributeItem.value
                                    )
                                      ? "white"
                                      : "#1D1F22",
                                  }}
                                  onClick={() =>
                                    this.setAttribute({
                                      name: attribute.name,
                                      value: attributeItem.value,
                                    })
                                  }
                                >
                                  {attributeItem.value}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ gap: "5px" }} className="flex">
                <div
                  style={{ height: "100%", flexDirection: "column" }}
                  className="flex  justify-between"
                >
                  <div
                    className="action-button flex items-center justify-center"
                    onClick={() => setCartItem(item)}
                  >
                    +
                  </div>
                  <div className="flex justify-center">{item.quantity}</div>
                  <div
                    className="action-button flex items-center justify-center"
                    onClick={() => removeCartItem(item)}
                  >
                    -
                  </div>
                </div>
                <div className="item-img flex items-center justify-center">
                  <img
                    width="121"
                    height="190"
                    src={item?.gallery[0]}
                    alt="img"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItem: state.cartSlice.product,
  currency: state.currencySlice.currency,
});
const mapDispatch = {
  removeCartItem: removeProductFromCart,
  setCartItem: setCart,
};
export default connect(mapStateToProps, mapDispatch)(ShoppingCart);
