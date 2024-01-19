import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllOrders } from "../../store/orders";

import OpenModalButton from "../OpenModalButton";
import ConfirmAdd from "../AllModals/ConfirmAddTo";
import CreateReview from "../AllModals/Review";
import ReturnItem from "../AllModals/ReturnItem";

import "./css/tabs/orders.css";
import "./css/tabs/univ.css";
import "./css/themes/green/light.css";
import "./css/themes/green/dark.css";
import "./css/themes/blue/light.css";
import "./css/themes/blue/dark.css";
import "./css/themes/purple/light.css";
import "./css/themes/purple/dark.css";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const orders = useSelector((state) => state.orders);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));
  // const [fullLoad, setFullLoad] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // ! Orders to be seperated by bag or cart orders - only cart orders can be returned

  return isLoaded ? (
    <>
      {orders && orders.length > 0 ? (
        <div className="orderTabContainer">
          <div className="ordersContainerDiv">
            {orders.map((order) => (
              <div className="idvOrderDiv" key={order.id}>
                <div className="orderCardTitle" id={theme}>
                  Order #: {order.id} - Order Total: ${order.total}
                </div>

                <div className="orderItemsContainer">
                  <div className="orderDetails" id={theme}>
                    <p>Order Date: {order.placed}</p>
                    <div>
                      {order.products[0].category.shippable && (
                        <>
                          <p>
                            Ship Date:
                            {order.createdAt}
                          </p>
                          <p>Delivered: {order.fulfilled}</p>
                        </>
                      )}
                    </div>

                    {order.products[0].category.shippable && (
                      <OpenModalButton
                        buttonText="Return All"
                        modalComponent={
                          <ReturnItem item={null} order={order} />
                        }
                      />
                    )}
                  </div>

                  <div className="orderItemsDiv" id={theme}>
                    {order.products.map((item) => (
                      <div className="orderItem" id={theme} key={item.id}>
                        <img
                          src={item.previewImg}
                          alt={item.name + "_previewImg"}
                        />
                        <div className="orderItemDetails" id={theme}>
                          <NavLink
                            exact
                            to={
                              item.category.shippable
                                ? `/product/${item.id}`
                                : `/menu/${item.id}`
                            }
                          >
                            {item.name}
                          </NavLink>
                          <div>
                            <p>${item.price}</p>
                            {" x "}
                            <p>{item.quantity}</p>{" "}
                            <p>
                              Item Total: $
                              {(
                                Number(item.price) * Number(item.quantity)
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="orderButtons">
                          <div className="reorder" id={theme}>
                            <OpenModalButton
                              buttonText="Buy Again"
                              modalComponent={
                                <ConfirmAdd
                                  where="Shopping Cart"
                                  product={item}
                                  user={user}
                                />
                              }
                            />
                          </div>

                          <div
                            className={
                              user.role.name === "Member" ? "review" : "hidden"
                            }
                            id={theme}
                          >
                            <OpenModalButton
                              buttonText="Post Review"
                              modalComponent={
                                <CreateReview
                                  itemId={item.id}
                                  locationInfo={{ from: "userProfile" }}
                                />
                              }
                            />
                          </div>

                          {item.category.shippable && (
                            <div className="return" id={theme}>
                              <OpenModalButton
                                buttonText="Return"
                                modalComponent={
                                  <ReturnItem item={item} order={order} />
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="noOrdersToDisplay" id={theme}>
          <h2>No past orders to display...</h2>
          <div className="noOrdersButtons" id={theme}>
            <NavLink exact to="/menu">
              <button>Order Takeout</button>
            </NavLink>

            <NavLink exact to="/products">
              <button>Shop Products</button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
