import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";
import {
  getAllOrders,
  returnItem,
  returnWholeOrder,
} from "../../../store/orders";

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
    <div>
      <h1>Return {item ? item.name : "Order"}?</h1>
      <button onClick={submitReturn}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
}
