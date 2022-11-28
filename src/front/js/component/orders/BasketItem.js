import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import DeleteIcon from "../icons/DeleteIcon";
import Quantity from "./Quantity";
import { IconContext } from "react-icons";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import PropTypes from "prop-types";

const BasketItem = ({ item }) => {
  const { store, actions } = useContext(Context);
  const [confirm, setConfirm] = useState(false);

  const handleQtyChange = (value) => {
    if (value === 0) {
      setConfirm(true);
    } else {
      actions.bi_quantity(item.id, value);
    }
  };

  return (
    <tr
      className="align-middle basket-item"
      style={{ backgroundColor: `${confirm ? "#a6444494" : ""}` }}
    >
      <td>
        <span className="text-center">
          <IconContext.Provider value={{ className: "", size: 20 }}>
            <DeleteIcon
              id={item.id}
              handleRemove={(value) => actions.delete_from_basket(value)}
            />
          </IconContext.Provider>
        </span>
      </td>

      <td>
        {" "}
        <Link className="basket-link" to={"/product/" + item.product_id}>
          {item.product.name}
        </Link>
      </td>
      <td>{item.product.type}</td>
      <td>{item.product.location}</td>
      <td className="text-center">
        {confirm ? (
          <div className="d-flex justify-content-center gap-1">
            <IconContext.Provider value={{ className: "", size: 25 }}>
              <button
                className="btn-custom btn p-1 bg-danger"
                onClick={() => actions.bi_quantity(item.id, 0)}
              >
                <MdDelete />
              </button>

              <button
                className="btn-custom btn p-1 bg-light"
                onClick={() => setConfirm(false)}
              >
                <MdOutlineCancel />
              </button>
            </IconContext.Provider>
          </div>
        ) : (
          <Quantity
            quantity={item.quantity}
            stock={item.product.stock}
            handleSetQuantity={handleQtyChange}
          />
        )}
      </td>
      <td className="basket-number">{item.product.stock}</td>
      <td className="basket-number">
        {item.product.price} €/{item.product.unit}
      </td>
      <td className="basket-number">
        {(Math.round(item.subtotal * 100) / 100).toFixed(2)} €
      </td>
    </tr>
  );
};

BasketItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default BasketItem;
