import React from "react";
import { IconContext } from "react-icons";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import PropTypes from "prop-types";

const Quantity = ({ quantity, stock, handleSetQuantity }) => {
  const handleChange = (e) => {
    if (e.target.value && !isNaN(e.target.value)) {
      if (e.target.value > stock) {
        handleSetQuantity(stock);
      } else if (e.target.value < 0) {
        handleSetQuantity(1);
      } else {
        handleSetQuantity(+e.target.value);
      }
    } else {
      handleSetQuantity(1);
    }
  };

  const handleAdd = () => {
    if (quantity < stock) handleSetQuantity(quantity + 1);
  };

  const handleRest = () => {
    if (quantity > 0) handleSetQuantity(quantity - 1);
  };

  return (
    <>
      {stock === 0 ? (
        <div className="text-error">Unavailable</div>
      ) : (
        <div
          className="btn-group "
          role="group"
          aria-label="Basic mixed styles example"
        >
          <IconContext.Provider
            value={{ className: "text-light py-1", size: 30 }}
          >
            <MdRemoveCircle
              type="button"
              className="text-secondary"
              onClick={handleRest}
            />
            <input
              value={quantity}
              onChange={handleChange}
              type="text"
              className="btn border p-0 mx-0 rounded-3 text-light fw-bolder"
              id="btncheck2"
              size={quantity.toString().length}
              placeholder="0"
              max={stock}
              min="0"
            />
            <MdAddCircle type="button" onClick={handleAdd} />
          </IconContext.Provider>
        </div>
      )}
    </>
  );
};

Quantity.propTypes = {
  quantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  handleSetQuantity: PropTypes.func.isRequired,
};

export default Quantity;
