import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import PropTypes from "prop-types";

const FavouriteIcon = ({ product }) => {
  const { store, actions } = useContext(Context);

  const favs_prod_ids = store.favourites.map((f) => {
    return f.product_id;
  });

  const handleItemInFavourites = (elem) => {
    if (!favs_prod_ids.includes(elem.id)) {
      actions.add_favourite(store.data.id, elem.id);
    } else {
      const getFav = store.favourites.filter((f) => {
        return f.product_id == elem.id;
      });
      actions.delete_favourite(getFav[0].id);
    }
  };

  return (
    <>
      {store.token ? (
        <span
          type="button"
          onClick={() => handleItemInFavourites(product)}
          className="text-warning icon"
        >
          {favs_prod_ids.includes(product.id) ? (
            <AiFillStar />
          ) : (
            <AiOutlineStar />
          )}
        </span>
      ) : null}
    </>
  );
};

FavouriteIcon.propTypes = {
  product: PropTypes.object.isRequired,
};

export default FavouriteIcon;
