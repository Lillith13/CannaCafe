import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getWishlist } from "../../store/wishlist";
import OpenModalButton from "../OpenModalButton";
import ConfirmRemove from "../AllModals/ConfirmRemove";

export default function UserWishlist() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const wishlist = useSelector((state) => state.wishlist);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const data = await dispatch(getWishlist()).then(() => setIsLoaded(true));
    if (data) {
      console.log(data);
    }
  }, [dispatch]);

  return isLoaded ? (
    <div>
      {Object.values(wishlist).length > 0 ? (
        <>
          {Object.values(wishlist).map((wish) => (
            <div key={wish.id}>
              <NavLink exact to={`/product/${wish.id}`}>
                <p>{wish.name}</p>
              </NavLink>
              <OpenModalButton
                buttonText="Remove From Wishlist"
                modalComponent={
                  <ConfirmRemove where="Wishlist" product={wish} />
                }
              />
            </div>
          ))}
        </>
      ) : (
        <div>
          <h3>No wishlist items yet...</h3>
          <NavLink exact to="/products">
            <button>Find Wishes to Add!</button>
          </NavLink>
        </div>
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
