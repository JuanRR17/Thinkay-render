import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { BsCart, BsFillCartFill } from "react-icons/bs";
import PropTypes from "prop-types";

const BasketIcon = ({ product }) => {
  const { store, actions } = useContext(Context);
  const [tooltip, setTooltip] = useState(false);

  //Get the product id of products in basket
  const basket_prod_ids = store.basket.map((b) => {
    return b.product_id;
  });

  //Get the user id of the products in the basket
  const basket_items_userid = store.basket.map((item) => {
    return item.product.user_id;
  })[0];

  const handleItemInBasket = (elem) => {
    if (!basket_prod_ids.includes(elem.id)) {
      if (basket_items_userid && basket_items_userid !== elem.user_id) {
        if (elem.stock > 0) setTooltip(!tooltip);
      } else if (!basket_items_userid || basket_items_userid === elem.user_id) {
        if (elem.stock > 0) {
          actions.add_to_basket(store.data.id, elem.id);
        }
      }
    } else {
      const getBasketProd = store.basket.filter((b) => {
        return b.product_id == elem.id;
      });
      actions.delete_from_basket(getBasketProd[0].id);
    }
  };

  if (tooltip) {
    setTimeout(() => setTooltip(false), 3000);
  }

  return (
    <>
      {store.token && product.user_id !== store.data?.id ? (
        <span
          id="basket-icon"
          type="button"
          onClick={() => handleItemInBasket(product)}
          className={`${tooltip && "basket-tooltip"} ${
            product.stock > 0 ? "text-success" : "text-danger"
          }`}
          data-tooltip="Basket can only contain items from the same user"
        >
          {basket_prod_ids.includes(product.id) ? (
            <BsFillCartFill />
          ) : (
            <BsCart />
          )}
        </span>
      ) : null}
    </>
  );
};

BasketIcon.propTypes = { product: PropTypes.object.isRequired };

export default BasketIcon;
