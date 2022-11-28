import React, { useContext, useEffect, useMemo } from "react";
import { Context } from "../../store/appContext";
import ProductsTableBase from "./ProductsTableBase";
import "../../../styles/index.css";
import PropTypes from "prop-types";

const UserProductsTable = ({ products }) => {
  const { store, actions } = useContext(Context);

  const update = useMemo(() => store.update, [store.update]);

  useEffect(() => {
    if (update) {
      actions.getCurrentUserData();
      actions.toggle_update();
    }
  }, [update]);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      center: true,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
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
      name: "Price",
      selector: (row) => `${row.price} €`,
      right: true,
      sortable: true,
      sortFunction: (a, b) => {
        return a.price - b.price;
      },
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      right: true,
      sortable: true,
    },

    {
      name: "Unit",
      selector: (row) => row.unit,
      center: true,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      center: true,
      sortable: true,
    },
  ];

  return (
    <>
      {store.data ? (
        <ProductsTableBase
          title="My By-Products"
          columns={columns}
          data={products}
        />
      ) : null}
    </>
  );
};

UserProductsTable.propTypes = {
  location: PropTypes.array,
};

export default UserProductsTable;
