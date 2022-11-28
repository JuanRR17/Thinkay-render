import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../utils/utils";
import PropTypes from "prop-types";

const ByProductForm = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const url = useLocation();
  const id = url.pathname.split("/").slice(-1);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(0);
  const [unit, setUnit] = useState(0);
  const [stock, setStock] = useState("");

  const [errors, setErrors] = useState();

  const types = store.types;
  const units = store.units;
  let user_id;

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    } else if (!store.data) {
      actions.getCurrentUserData();
    } else {
      user_id = store.data.id;
    }
    if (!isNaN(id)) {
      if (!store.product || store.product.id != id) {
        actions.getProductData(id);
      }
    }
  });

  useEffect(() => {
    if (!isNaN(id) && store.product) {
      setName(store.product.name);
      setLocation(store.product.location);
      setPrice(store.product.price);
      setDescription(store.product.description);
      setType(store.types.indexOf(store.product.type));
      setUnit(store.units.indexOf(store.product.unit));
      setStock(store.product.stock);
    }
  }, [store.product]);

  const handleConfirm = async () => {
    // const inputImage = document.getElementById("inputImage").files[0];
    // console.log("inputImage:", inputImage);

    //Gather errors
    let select_errors;
    if (+type === 0) {
      select_errors = { ...select_errors, type: "Select a type" };
    }
    if (+unit === 0) {
      select_errors = { ...select_errors, unit: "Select a unit" };
    }
    if (!name) {
      select_errors = { ...select_errors, name: "Enter a name" };
    }
    if (!location) {
      select_errors = { ...select_errors, location: "Enter a location" };
    }
    if (isNaN(price) || price <= 0) {
      select_errors = {
        ...select_errors,
        price: "Enter a price",
      };
    }

    //Check if any error exists
    // console.log("select_errors", select_errors);
    if (select_errors) {
      setErrors(select_errors);
      return;
    } else if (errors) {
      setErrors("");
    }

    //Create product if there are no errors
    if (isNaN(id)) {
      if (
        await actions.new_product(
          user_id,
          name,
          stock,
          type,
          price,
          unit,
          location,
          description
          // inputImage
        )
      )
        navigate("/profile");
    } else {
      if (
        await actions.edit_product(
          store.product.id,
          user_id,
          name,
          stock,
          store.types[type],
          price,
          store.units[unit],
          location,
          description
          // inputImage
        )
      )
        navigate("/profile");
    }
  };

  const handleCancel = () => {
    actions.clearmessage();
    navigate("/profile");
  };

  return (
    <div className="mt-5">
      <div className="m-auto w-75 bg-custom p-3">
        <h1 className=" text-center">
          {store.product ? "Edit " : "Add "}
          Byproduct
        </h1>
        <div className="container">
          <div className="row">
            {/* Name field */}
            <div className="mb-3 col col-lg-6">
              <label htmlFor="inputUser" className=" form-label">
                Name*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputUser"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors?.name ? (
                <div className="text-error">{errors?.name}</div>
              ) : null}
            </div>
            {/* Location field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputLocation" className=" form-label">
                Location*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputLocation"
                value={location ?? ""}
                onChange={(e) => setLocation(capitalize(e.target.value))}
              />
              {errors?.location ? (
                <div className="text-error">{errors?.location}</div>
              ) : null}
              {store.message &&
              store.message.split(" ")[store.message.split(" ").length - 1] ===
                "location" ? (
                <div className="text-error">{store.message}</div>
              ) : null}
            </div>
            {/* Price field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputPrice" className=" form-label">
                Price*
              </label>
              <input
                required
                type="number"
                className="form-control"
                placeholder="€"
                id="inputPrice"
                value={price ?? 0}
                min="0"
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors?.price ? (
                <div className="text-error">{errors?.price}</div>
              ) : null}
            </div>
            {/* Unit field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputUnit" className=" form-label">
                Units*
              </label>
              <select
                name="select"
                className="form-select"
                id="inputType"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {units.map((u, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {u}
                    </option>
                  );
                })}
              </select>
              {errors?.unit ? (
                <div className="text-error">{errors?.unit}</div>
              ) : null}
            </div>
            {/* Stock field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputStock" className=" form-label">
                Stock*
              </label>
              <input
                required
                type="number"
                className="form-control"
                placeholder="0"
                id="inputStock"
                value={stock}
                min="0"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {/* Type field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputType" className=" form-label">
                Type*
              </label>
              <select
                name="select"
                className="form-select"
                id="inputType"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {types.map((t, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {t}
                    </option>
                  );
                })}
              </select>
              {errors?.type ? (
                <div className="text-error">{errors?.type}</div>
              ) : null}
            </div>
            {/* Description field */}
            <div className="mb-3 col-12">
              <label htmlFor="inputDescription" className=" form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                id="inputDescription"
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* Image field */}
            {/* <div className="row">
              <div className="mb-3 col-lg-6">
                <label htmlFor="inputImage" className="form-label">
                  Insert image
                </label>
                <input type="file" className="form-control" id="inputImage" />
              </div>
            </div> */}
          </div>
          <div className="py-2 d-flex gap-2">
            <button
              onClick={handleConfirm}
              className="btn btn-success btn-custom"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-danger btn-custom"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ByProductForm.propTypes = {};

export default ByProductForm;
