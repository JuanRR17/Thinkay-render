import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import DeleteIcon from "../icons/DeleteIcon";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BasketLI = ({ item }) => {
  const { store, actions } = useContext(Context);

  return (
    <li className="dropdown-item list-group-item text-success basket-li">
      <Link
        className="text-decoration-none text-success"
        to={"/product/" + item.product_id}
      >
        {item.product.name}
      </Link>
      <span className="float-end">
        <DeleteIcon
          id={item.id}
          handleRemove={(value) => actions.delete_from_basket(value)}
        />
      </span>
    </li>
  );
};

BasketLI.propTypes = { item: PropTypes.object.isRequired };

export default BasketLI;
