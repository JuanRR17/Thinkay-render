import React, { useContext, useEffect, useMemo } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Basket from "./byproducts/Basket";
import Favourites from "./byproducts/Favourites";
import SearchBar from "./search_bar/SearchBar";
import { IconContext } from "react-icons";
import { FaPowerOff } from "react-icons/fa";
import logo from "../../img/logo.png";

const Navbar = () => {
  const { store, actions } = useContext(Context);

  const token = useMemo(() => store.token, [store.token]);
  const data = useMemo(() => {
    store.data;
  }, [store.data?.id]);

  //Get Products List
  useEffect(() => {
    actions.getAllProducts();
  }, []);

  useEffect(() => {
    if (!data && token) {
      actions.getCurrentUserData();
    }
  }, [token, data]);
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light nav-tabs sticky-top"
      style={{ background: "linear-gradient(to left, orange, yellow)" }}
    >
      <div className="container">
        <Link className="nav-item nav-link" to="/">
          <img src={logo} alt="logo" height="50" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
            <Link className="nav-item nav-link" to="/prod_list">
              <span>Products</span>
            </Link>

            {store.token && store.data ? (
              <>
                <Link className="nav-item nav-link" to="profile">
                  <span>{store.data.username}</span>
                </Link>
                <Favourites />
                <Basket />
                <IconContext.Provider value={{ className: "", size: 35 }}>
                  <div>
                    <FaPowerOff
                      onClick={() => actions.logout()}
                      className="btn btn-danger p-2 m-1 btn-custom"
                    />
                  </div>
                </IconContext.Provider>
              </>
            ) : (
              <>
                <Link className="nav-item nav-link" to="signup">
                  <span>Sign Up</span>
                </Link>
                <Link className="nav-item nav-link" to="login">
                  <span>Login</span>
                </Link>
              </>
            )}
            <span>
              <SearchBar data={store.all_products} />
            </span>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
