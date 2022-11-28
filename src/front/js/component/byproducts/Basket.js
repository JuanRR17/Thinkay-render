import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import BasketLI from "./BasketLI";
import { IconContext } from "react-icons";
import { BsCart, BsFillCartFill } from "react-icons/bs";

const Basket = () => {
  const { store, actions } = useContext(Context);

  const ulStyle = {
    width: "max-content",
  };

  useEffect(() => {
    if (!store.basket) actions.getCurrentUserData();
  }, []);

  return (
    <>
      {store.token ? (
        <div className="dropdown">
          <button
            className="btn btn-success p-1 m-1 btn-custom"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <IconContext.Provider value={{ className: "px-1", size: 25 }}>
              <span>
                {store.basket.length === 0 ? <BsCart /> : <BsFillCartFill />}
              </span>
            </IconContext.Provider>

            <span className="p-1 fw-bolder">{store.basket.length}</span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end p-1 border-0 bg-success btn-custom"
            aria-labelledby="dropdownMenuLink"
            style={ulStyle}
          >
            {store.basket.length > 0 ? (
              <>
                <li className="text-center p-1 bg-transparent">
                  <Link
                    to="/confirm_order"
                    className="text-decoration-none text-light"
                  >
                    Go To Basket
                  </Link>
                </li>
                {store.basket.map((item) => {
                  return <BasketLI key={item.id} item={item} />;
                })}
              </>
            ) : (
              <li className="text-center text-light">(empty)</li>
            )}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Basket;
