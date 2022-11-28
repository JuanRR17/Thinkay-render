import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/Home";

import { SignUp } from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ByProductForm from "./pages/ByProductForm";
import ProductsList from "./pages/ProductsList";
import { Product } from "./pages/Product";
import ConfirmOrder from "./pages/ConfirmOrder";
import Order from "./pages/Order";

import injectContext from "./store/appContext";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<ByProductForm />} path="/byproduct_form/:id" />
            <Route element={<ByProductForm />} path="/byproduct_form/" />
            <Route element={<ProductsList />} path="/prod_list" />
            <Route element={<Product />} path="/product/:id" />
            <Route element={<Order />} path="/order/:id" />
            <Route element={<ConfirmOrder />} path="/confirm_order" />

            <Route element={<h1>Not found!</h1>} />
          </Routes>
          {/* <Footer /> */}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
