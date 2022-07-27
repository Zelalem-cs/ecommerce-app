import React from "react";
import "./shopping-cart.css";
import { connect } from "react-redux";
import { cartSlice } from "../../store/slices/cart-slice";

class ShoppingCart extends React.Component {
  componentDidMount() {
    let total = 0;
    this.props.cartItem?.map((item) => (total = total + item.prices[0].amount));
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {this.props.cartItem.map((item, idx) => {
          return (
            <div className="cart-item flex justify-between" key={idx}>
              <div className="item-description">
                <div
                  style={{ width: "100%", gap: "5px" }}
                  className="flex justify-between"
                >
                  <div className="item-name">{`${item.brand} ${item.name}`}</div>
                </div>
                <div style={{ width: "100%" }} className="flex justify-between">
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "25.6px",
                    }}
                  >
                    {item.prices.map(
                      (price) =>
                        price.currency.symbol === localStorage.currency &&
                        `${price.currency.symbol} ${price.amount}`
                    )}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      gap: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {item.attributes.map((attribute, index) => {
                      return (
                        <div style={{ width: "100%" }} key={index}>
                          <div
                            style={{
                              width: "100%",
                              gap: "10px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              <div>{attribute.name}:</div>
                            </div>
                            <div
                              style={{ width: "100%", gap: "5px" }}
                              className="flex items-center "
                            >
                              {attribute.items.map((attributeItem, idx) =>
                                attribute.name === "Color" ? (
                                  <div
                                    key={idx}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
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
                                    className="flex items-center justify-center"
                                    style={{
                                      border: "solid 1.7px",
                                      width: "fit-content",
                                      height: "fit-content",
                                      padding: "6px",
                                      fontFamily: "Source Sans Pro",
                                      fontStyle: "normal",
                                      fontSize: "12px",
                                      fontWeight: "400",
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

                {/* <div style={{ width: "100%" }}>
                     
                    </div> */}
              </div>
              <div style={{ gap: "5px" }} className="flex">
                <div
                  style={{ height: "100%", flexDirection: "column" }}
                  className="flex  justify-between"
                >
                  <div
                    style={{
                      border: "solid thin",
                      minWidth: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                    className="flex items-center justify-center"
                    onClick={() => this.props.setCartItem(item)}
                  >
                    +
                  </div>
                  <div className="flex justify-center">{item.quantity}</div>
                  <div
                    style={{
                      border: "solid thin",
                      minWidth: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                    className="flex items-center justify-center"
                    onClick={() => this.props.removeCartItem(item)}
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
});
const mapDispatch = {
  removeCartItem: cartSlice.actions.removeProductFromCart,
  setCartItem: cartSlice.actions.setCart,
};
export default connect(mapStateToProps, mapDispatch)(ShoppingCart);
