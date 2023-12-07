import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllFavorites } from "../../store/favorites";
import OpenModalButton from "../OpenModalButton";
import ConfirmRemove from "../AllModals/ConfirmRemove";

export default function UserFavorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const faves = useSelector((state) => state.favorites);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const data = await dispatch(getAllFavorites()).then(() =>
      setIsLoaded(true)
    );
    if (data) {
      console.log(data);
    }
  }, [dispatch]);

  return isLoaded ? (
    <div>
      {Object.values(faves).length > 0 ? (
        <>
          {Object.values(faves).map((fave) => (
            <div key={fave.id}>
              <NavLink exact to={`/menu/${fave.id}`}>
                <p>{fave.name}</p>
              </NavLink>
              <OpenModalButton
                buttonText="Remove From Favorites"
                modalComponent={
                  <ConfirmRemove where="Favorites" product={fave} />
                }
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <h3>No favorites yet...</h3>
          <NavLink exact to="/menu">
            <button>Find Faves to Add!</button>
          </NavLink>
        </>
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
