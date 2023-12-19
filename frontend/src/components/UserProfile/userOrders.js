import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/orders";

import "./UserProfile.css";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const orders = useSelector((state) => state.orders);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fullLoad, setFullLoad] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (orders.length) {
      orders.map((order) => {
        let sum = 0;
        order.products.map((item) => {
          sum += parseFloat(item.price) * item.quantity;
        });
        if (order.total != sum) {
          order.total = sum.toFixed(2);
        }
      });
      setFullLoad(true);
    }
  }, [isLoaded]);

  // ! Orders to be seperated by bag or cart orders - only cart orders can be returned

  return fullLoad ? (
    <>
      {orders && orders.length > 0 ? (
        <div className="orderTabContainer">
          <div className="ordersContainerDiv">
            {orders.map((order) => (
              <div className="idvOrderDiv" key={order.id}>
                <div className="orderCardTitle">
                  Order #: {order.id} - Order Total: ${order.total}
                  {/* {console.log(order)} */}
                </div>

                <div className="orderItemsContainer">
                  <div className="orderDetails">
                    <p>Order Date: {order.placed}</p>
                    <div>
                      <p>Ship Date: {order.shipped}</p>
                      <p>Delivered: {order.fulfilled}</p>
                    </div>
                    <button>Return All</button>
                  </div>

                  <div className="orderItemsDiv">
                    {order.products.map((item) => (
                      <div className="orderItem" key={item.id}>
                        <img
                          src={item.previewImg}
                          alt={item.name + "_previewImg"}
                        />
                        <div className="orderItemDetails">
                          <p>{item.name}: </p>
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
                          <button id="orderBuyAgainButton">Buy Again</button>
                          <button
                            title="coming soon..."
                            id="orderPostReviewButton"
                          >
                            Post Review
                          </button>
                          <button id="orderReturnButton">Return</button>
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
        <h2>No past orders to display...</h2>
      )}
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
