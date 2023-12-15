import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/orders";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const orders = useSelector((state) => state.orders);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // user_id:2
  // products:Array(3)
  //  --> 0:{category: {…}, description: 'Leader such prevent court prove. Analysis first pr…first push. Unit which even together star ground.', id: 36, name: 'Girl Scout Cookies', previewImg: 'https://uploads.medicaljane.com/wp-content/uploads/2012/07/gscHD7.jpg', …}
  //  --> 1:{category: {…}, description: 'Power yard why. Attack score food prove tree anima…s such. My yeah yard factor note loss successful.', id: 40, name: 'Durban Poison', previewImg: 'https://images.hytiva.com/Durban-Poison.jpg?mw667-mh1000', …}
  //  --> 2:{category: {…}, description: 'Couple world player other gun conference. Coach gu…ury onto reduce learn. Arrive explain tough born.', id: 42, name: 'Strawberry Cough', previewImg: 'https://ilgm.com/media/catalog/product/cache/823fa…rry-cough-marijuana-seeds_feminized_480x480px.jpg', …}
  // shipped: null
  // fulfilled:null
  // placed:"Thu, 14 Dec 2023 00:00:00 GMT"

  // ! Orders to be seperated by bag or cart orders - only cart orders can be returned

  return isLoaded && orders && orders.length > 0 ? (
    <div
      style={{
        display: "flex",
        width: "95%",
        border: "1px solid black",
        marginLeft: "15px",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    >
      <div
        className="ordersContainerDiv"
        style={{
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {orders.map((order) => (
          <div className="idvOrderDiv">
            <h3>
              Order #: {order.id} - Order Total: {order.total}
            </h3>

            <div>
              <p>Order Date: {order.placed}</p>
              <p>Ship Date: {order.shipped}</p>
              <p>Delivered: {order.fulfilled}</p>
            </div>

            <div
              style={{
                display: "flex",
                width: "95%",
                border: "1px solid black",
                marginLeft: "15px",
                marginTop: "25px",
                marginBottom: "25px",
              }}
            >
              {order.products.map((item) => (
                <div style={{ display: "flex" }}>
                  <p>{item.price}</p>
                  {" x "}
                  <p>{item.quantity}</p>{" "}
                  <p>
                    Item Total:{" "}
                    {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
