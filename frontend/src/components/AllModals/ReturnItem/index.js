import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";
import {
  getAllOrders,
  returnItem,
  returnWholeOrder,
} from "../../../store/orders";

import "./ReturnItem.css";

export default function ReturnItem({ item, order }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const submitReturn = async () => {
    let data = null;

    if (item) {
      if (order.products.length == 1) {
        data = await dispatch(returnWholeOrder(order.id));
      } else {
        data = await dispatch(returnItem(order.id, item.id));
      }
    } else {
      data = await dispatch(returnWholeOrder(order.id));
    }

    if (data) {
      console.log(data);
    } else {
      dispatch(getAllOrders());
    }

    closeModal();
  };

  return (
    <div className="returnItemsModalDiv">
      <h1>Return {item ? item.name : "Order"}?</h1>
      <div className="returnItemsModalButtons">
        <button id="returnItems" onClick={submitReturn}>
          Yes (return)
        </button>
        <button onClick={closeModal}>No (keep)</button>
      </div>
    </div>
  );
}
