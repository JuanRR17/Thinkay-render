import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../component/buttons/BackButton";
import OrderRows from "../component/orders/OrderRows";
import PropTypes from "prop-types";

const Order = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/").slice(-1);

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    } else {
      if (!store.data) {
        actions.getCurrentUserData();
      }
      if (!store.orders_made && store.data) {
        actions.getMadeOrders(store.data.id);
      }
      if (!store.orders_sold && store.data) {
        actions.getSoldOrders(store.data.id);
      }
      if (!store.order || store.order.id != id) {
        actions.getOrderData(id);
      }
    }
  });
  return (
    <div className="col-md-10 col-xl-6 m-3 bg-custom px-5 py-4 m-auto">
      <BackButton route={"/profile"} />
      {store.order ? (
        <>
          <h1 className="text-center mb-4">Order #{store.order.id}</h1>
          <div className="container-fluid">
            <div className="m-auto" style={{ width: "500px" }}>
              <div className="row gap-2 ">
                <div className="col-auto mb-2">
                  <label className="mb-0">Creation Date: </label>{" "}
                  <div>{store.order.created_at}</div>
                </div>
                <div className="col-auto mb-2">
                  <label className="mb-0">Client: </label>{" "}
                  <div>{store.order.buyer_username ?? "User deleted"}</div>
                </div>
                <div className="col-auto mb-2">
                  <label className="mb-0">Seller: </label>{" "}
                  <div>{store.order.seller_username ?? "User deleted"}</div>
                </div>
              </div>
              <div className="my-2 mx-auto" style={{ width: "500px" }}>
                <label>Order Items:</label>
                <OrderRows orderRows={store.order.order_rows} />
                <h3 className=" fw-bolder text-end">
                  Total: {store.order.total} €
                </h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        "This order doesn't exist"
      )}
    </div>
  );
};

Order.propTypes = {};

export default Order;
