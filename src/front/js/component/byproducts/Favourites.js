import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import FavouriteLI from "./FavouriteLI";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";

const Favourites = () => {
  const { store, actions } = useContext(Context);
  const ulStyle = {
    width: "max-content",
  };

  useEffect(() => {
    actions.getCurrentUserData();
  }, []);

  return (
    <>
      {store.token ? (
        <div className="dropdown">
          <button
            className="btn btn-light p-1 m-1 btn-custom text-warning"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <IconContext.Provider value={{ className: "", size: 25 }}>
              {store.favourites.length === 0 ? (
                <AiOutlineStar />
              ) : (
                <AiFillStar />
              )}{" "}
            </IconContext.Provider>
            <span className="p-1 text-warning fw-bolder">
              {store.favourites.length}
            </span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end p-1 border-0 bg-warning btn-custom"
            aria-labelledby="dropdownMenuLink"
            style={ulStyle}
          >
            {store.favourites.length > 0 ? (
              <>
                <li className="text-center p-1 bg-transparent text-success">
                  Favourites
                </li>
                {store.favourites.map((fav) => {
                  return <FavouriteLI key={fav.id} fav={fav} />;
                })}
              </>
            ) : (
              <li className="text-center text-success">(empty)</li>
            )}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Favourites;
