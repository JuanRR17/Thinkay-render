import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import OrdersTableBase from "./OrdersTableBase";

const MyOrdersTable = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

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
    }
  });

  const columns = [
    {
      name: "Order Id",
      selector: (row) => row.id,
      center: true,
      sortable: true,
    },
    {
      name: "Seller",
      selector: (row) => row.seller_username,
      center: true,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      center: true,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      center: true,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => `${row.total} €`,
      right: true,
      sortable: true,
      sortFunction: (a, b) => {
        return a.total - b.total;
      },
    },
  ];

  return (
    <>
      {store.orders_made ? (
        <OrdersTableBase
          title="My Made Orders"
          columns={columns}
          data={store.orders_made}
        />
      ) : null}
    </>
  );
};

export default MyOrdersTable;
