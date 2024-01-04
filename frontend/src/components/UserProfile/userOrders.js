import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllOrders } from "../../store/orders";

import "./UserProfile.css";
import OpenModalButton from "../OpenModalButton";
import ConfirmAdd from "../AllModals/ConfirmAddTo";
import CreateReview from "../AllModals/Review";
import ReturnItem from "../AllModals/ReturnItem";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const orders = useSelector((state) => state.orders);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [fullLoad, setFullLoad] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const calcTotal = (order) => {
    let sum = 0;
    order.products.map((item) => {
      sum += parseFloat(item.price) * item.quantity;
    });
    if (order.total != sum) {
      order.total = sum.toFixed(2);
      // return sum.toFixed(2);
    } /* else {
      return order.total;
    } */
  };

  // ! Orders to be seperated by bag or cart orders - only cart orders can be returned

  return isLoaded ? (
    <>
      {orders && orders.length > 0 ? (
        <div className="orderTabContainer">
          <div className="ordersContainerDiv">
            {orders.map((order) => (
              <div className="idvOrderDiv" key={order.id}>
                <div className="orderCardTitle">
                  Order #: {order.id} - Order Total: ${order.total}
                </div>

                <div className="orderItemsContainer">
                  <div className="orderDetails">
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

                  <div className="orderItemsDiv">
                    {order.products.map((item) => (
                      <div className="orderItem" key={item.id}>
                        <img
                          src={item.previewImg}
                          alt={item.name + "_previewImg"}
                        />
                        <div className="orderItemDetails">
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
                          <div id="reorder">
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
                            id="review"
                            className={
                              user.role.name === "Member" ? "" : "hidden"
                            }
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
                            <div id="return">
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
        <div className="noOrdersToDisplay">
          <h2>No past orders to display...</h2>
          <div id="noOrdersButtons">
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
