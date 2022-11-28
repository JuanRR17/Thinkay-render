import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";

import PropTypes from "prop-types";

const DeliveryForm = ({ delivery, errors, handleSetDelivery }) => {
  const { store, actions } = useContext(Context);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [province, setProvince] = useState("");
  const [cp, setCp] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (delivery) {
      setAddress(delivery.address);
      setLocation(delivery.location);
      setCp(delivery.cp);
      setProvince(delivery.province);
      setCountry(delivery.country);
      setPhone(delivery.phone);
      setCompany(delivery.company);
    }
  }, [delivery]);

  return (
    <div className="mt-5">
      <div className="m-auto bg-opacity-75 bg-warning p-3">
        <div className="container">
          <div className="row">
            {/* Address field */}
            <div className="mb-3 col col-md-6">
              <label htmlFor="inputAddress" className="form-label">
                Address*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputAddress"
                value={address ?? ""}
                onChange={(e) =>
                  handleSetDelivery({ ...delivery, address: e.target.value })
                }
              />
              {errors?.address ? (
                <div className="text-error">{errors?.address}</div>
              ) : null}
            </div>
            {/* Location field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputLocation" className="form-label">
                Location*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputLocation"
                value={location ?? ""}
                onChange={(e) =>
                  handleSetDelivery({ ...delivery, location: e.target.value })
                }
              />
              {errors?.location ? (
                <div className="text-error">{errors?.location}</div>
              ) : null}
              {store?.message &&
              store.message.split(" ")[store.message.split(" ").length - 1] ===
                "location" ? (
                <div className="text-error">{store.message}</div>
              ) : null}
            </div>
            {/* CP field */}
            <div className="mb-3  col-sm-6 col-md-4 col-lg-6">
              <label htmlFor="inputCp" className="form-label">
                CP*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputCp"
                value={cp ?? ""}
                min="0"
                onChange={(e) =>
                  handleSetDelivery({ ...delivery, cp: e.target.value })
                }
              />
              {errors?.cp ? (
                <div className="text-error">{errors?.cp}</div>
              ) : null}
            </div>
            {/* Province field */}
            <div className="mb-3  col-sm-6 col-md-4 col-lg-6">
              <label htmlFor="inputProvince" className="form-label">
                Province*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputProvince"
                value={province ?? ""}
                onChange={(e) =>
                  handleSetDelivery({ ...delivery, province: e.target.value })
                }
              />
              {errors?.province ? (
                <div className="text-error">{errors?.province}</div>
              ) : null}
            </div>
            {/* Country field */}
            <div className="mb-3  col-sm-6 col-md-4 col-lg-6">
              <label htmlFor="inputCountry" className="form-label">
                Country*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputCountry"
                value={country ?? ""}
                onChange={(e) =>
                  handleSetDelivery({ ...delivery, country: e.target.value })
                }
              />
              {errors?.country ? (
                <div className="text-error">{errors?.country}</div>
              ) : null}
            </div>
            {/* Phone field */}
            <div className="mb-3  col-sm-6 col-md-4 col-lg-6">
              <label htmlFor="inputPhone" className="form-label">
                Phone*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputPhone"
                value={phone ?? ""}
                onChange={(e) =>
                  handleSetDelivery({ ...delivery, phone: e.target.value })
                }
              />
              {errors?.phone ? (
                <div className="text-error">{errors?.phone}</div>
              ) : null}
            </div>
            {/* Company field */}
            <div className="mb-3  col-sm-6 col-md-4 col-lg-6">
              <label htmlFor="inputCompany" className="form-label">
                Company
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCompany"
                value={company ?? ""}
                onChange={(e) =>
                  handleSetDelivery({ ...delivery, company: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DeliveryForm.propTypes = {
  delivery: PropTypes.object,
  errors: PropTypes.object,
  handleSetDelivery: PropTypes.func.isRequired,
};

export default DeliveryForm;
