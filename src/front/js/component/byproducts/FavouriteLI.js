import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import BasketIcon from "../icons/BasketIcon";
import DeleteIcon from "../icons/DeleteIcon";
import PropTypes from "prop-types";

const FavouriteLI = ({ fav }) => {
  const { store, actions } = useContext(Context);

  const style = {
    color: "#b27300",
  };

  return (
    <li className="dropdown-item list-group-item favourite-li">
      <Link
        className="text-decoration-none pe-2"
        style={style}
        to={"/product/" + fav.product_id}
      >
        {fav.product.name}
      </Link>
      <span className="float-end">
        <BasketIcon product={fav.product} />
        <DeleteIcon
          id={fav.id}
          handleRemove={(value) => actions.delete_favourite(value)}
        />
      </span>
    </li>
  );
};

FavouriteLI.propTypes = {
  fav: PropTypes.object.isRequired,
};

export default FavouriteLI;
