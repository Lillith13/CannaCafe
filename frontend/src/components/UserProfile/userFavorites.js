import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllFavorites, delFromFaves } from "../../store/favorites";

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

  const handleRemove = async (e) => {
    e.preventDefault();
    const data = await dispatch(delFromFaves(e.target.value));
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
      {Object.values(faves).length > 0 ? (
        <>
          {Object.values(faves).map((fave) => (
            <div key={fave.id}>
              <NavLink exact to={`/menu/${fave.id}`}>
                <p>{fave.name}</p>
              </NavLink>
              <button value={fave.id} onClick={(e) => handleRemove(e)}>
                Remove from Favorites
              </button>
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
