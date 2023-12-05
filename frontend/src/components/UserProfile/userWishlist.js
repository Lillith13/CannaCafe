import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { delFromWishlist, getWishlist } from "../../store/wishlist";

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

  const handleRemove = async (e) => {
    e.preventDefault();
    const data = await dispatch(delFromWishlist(e.target.value));
    if (data) {
      console.log(data);
    }
    if (!data) {
      const msg = "Successfully removed from favorites";
      alert(msg);
    }
  };

  return isLoaded ? (
    <div>
      {Object.values(wishlist).length > 0 ? (
        <>
          {Object.values(wishlist).map((wish) => (
            <div key={wish.id}>
              <NavLink exact to={`/product/${wish.id}`}>
                <p>{wish.name}</p>
              </NavLink>
              <button value={wish.id} onClick={(e) => handleRemove(e)}>
                Remove from Wishlist
              </button>
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
