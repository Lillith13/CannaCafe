import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllFavorites } from "../../store/favorites";
import OpenModalButton from "../OpenModalButton";
import ConfirmRemove from "../AllModals/ConfirmRemove";

import "./css/tabs/univ.css";
import "./css/themes/green/light.css";
import "./css/themes/green/dark.css";
import "./css/themes/blue/light.css";
import "./css/themes/blue/dark.css";
import "./css/themes/purple/light.css";
import "./css/themes/purple/dark.css";

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
    <div
      className="userFavesTabContainer"
      id={Object.values(faves).length > 0 ? "" : "empty"}
    >
      {Object.values(faves).length > 0 ? (
        <>
          {Object.values(faves).map((fave) => (
            <div
              key={fave.id}
              className="userFavesContainer"
              style={{ backgroundImage: `url(${fave.previewImg})` }}
            >
              {console.log(fave.previewImg)}
              <NavLink exact to={`/menu/${fave.id}`}>
                <h1>{fave.name}</h1>
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
        <div className="emptyFavesTab">
          <h1>No favorites yet...</h1>
          <NavLink exact to="/menu">
            <button className="emptyFavesTabButton">Find Faves to Add!</button>
          </NavLink>
        </div>
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
