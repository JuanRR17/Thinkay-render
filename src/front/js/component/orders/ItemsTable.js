import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import BasketItem from "./BasketItem";
import PropTypes from "prop-types";

const ItemsTable = ({ total }) => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <h3 className="fw-bolder">Items from user: {store.user?.username}</h3>
      <table className="table ">
        <thead>
          <tr>
            <th className="col" scope="col">
              Actions
            </th>
            <th className="col-2" scope="col">
              By-Product
            </th>
            <th className="col" scope="col">
              Type
            </th>
            <th className="col" scope="col">
              Location
            </th>
            <th className="col-1 text-center" scope="col">
              Quantity
            </th>
            <th className="col-1 basket-number" scope="col">
              Stock
            </th>
            <th className="col flex-grow-1 basket-number" scope="col">
              Price
            </th>
            <th className="col-2 basket-number" scope="col">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {store.basket
            ? store.basket.map((part, idx) => {
                return <BasketItem key={idx} item={part} />;
              })
            : "No Items in Basket"}
        </tbody>
        <tfoot>
          <tr>
            <td className="basket-number fw-bolder h4" colSpan="7">
              Total:
            </td>
            <td className="basket-number fw-bolder h4">
              {(Math.round(total * 100) / 100).toFixed(2)} €
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

ItemsTable.propTypes = {
  total: PropTypes.number.isRequired,
};

export default ItemsTable;
