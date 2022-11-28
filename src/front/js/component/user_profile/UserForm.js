import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/utils";
import PropTypes from "prop-types";

const UserForm = ({ edit, handleSetEdit }) => {
  const { store, actions } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState();

  const id = store.data?.id;
  const data = useRef(store?.data);

  useEffect(() => {
    actions.clearmessage();
  }, []);

  useEffect(() => {
    if (store.data) {
      setUsername(data.current.username);
      setEmail(data.current.email);
      setCompany(data.current.company ? data.current.company : "");
      setPhone(data.current.phone ? data.current.phone : "");
      setLocation(data.current.location ? data.current.location : "");
      setPassword(data.current.password ? data.current.password : "");
    }
  }, [data.current]);

  const handleSubmit = async () => {
    let select_errors;
    if (!username) {
      select_errors = { ...select_errors, username: "Enter a Username" };
    }
    if (!email) {
      select_errors = { ...select_errors, email: "Enter an email" };
    }
    if (!edit && !password) {
      select_errors = { ...select_errors, password: "Enter a password" };
    }

    //Check if any error exists
    if (select_errors) {
      setErrors(select_errors);
      actions.clearmessage();
      return;
    } else if (errors) {
      setErrors("");
    }

    if (!edit) {
      if (
        await actions.signup(
          username,
          email,
          company,
          phone,
          location,
          password
        )
      ) {
        await actions.login(email, password);

        navigate("/profile");
      }
    } else {
      if (
        await actions.editprofile(
          id,
          username,
          email,
          company,
          phone,
          location,
          password
        )
      )
        handleSetEdit(false);
    }
  };

  const handleCancel = () => {
    actions.clearmessage();
    if (edit) {
      handleSetEdit(false);
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <h1 className=" text-center">{edit ? "Update" : "Create"} Profile</h1>
      <div className="container pb-3">
        <div className="row">
          {/* username field */}
          <div className="mb-3 col-md-6">
            <label htmlFor="inputUser" className=" form-label">
              Username *
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="inputUser"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors?.username ? (
              <div className="text-error">{errors?.username}</div>
            ) : null}
            {store.message && store.message.split(" ")[1] === "username" ? (
              <div className="text-error">{store.message}</div>
            ) : null}
          </div>
          {/* email field */}
          <div className="mb-3 col-md-6">
            <label htmlFor="inputEmail" className=" form-label">
              Email *
            </label>
            <input
              required
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email ? (
              <div className="text-error">{errors?.email}</div>
            ) : null}
            {store.message && store.message.split(" ")[1] === "email" ? (
              <div className="text-error">{store.message}</div>
            ) : null}
          </div>
          {/* Company field */}
          <div className="mb-3 col-sm-6 col-md-4">
            <label htmlFor="inputCompany" className=" form-label ">
              Company
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCompany"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          {/* Phone field */}
          <div className="mb-3 col-sm-6 col-md-4">
            <label htmlFor="inputPhone" className=" form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* Location field */}
          <div className="mb-3 col-sm-6 col-md-4">
            <label htmlFor="inputLocation" className=" form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="inputLocation"
              value={location}
              onChange={(e) => setLocation(capitalize(e.target.value))}
            />

            {store.message &&
            store.message.split(" ")[store.message.split(" ").length - 1] ===
              "location" ? (
              <div className="text-error">{store.message}</div>
            ) : null}
          </div>
        </div>
        <div className="row">
          {/* password field */}
          <div className="mb-3 col-sm-6">
            <label htmlFor="inputPassword" className=" form-label">
              Password {!edit && "*"}
            </label>
            <input
              required
              type="password"
              className="form-control"
              placeholder={edit ? "New password" : ""}
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors?.password ? (
              <div className="text-error">{errors?.password}</div>
            ) : null}
          </div>
        </div>
        <div className="py-2 d-flex gap-2">
          <button className="btn btn-success btn-custom" onClick={handleSubmit}>
            {edit ? "Update" : "Sign Up"}
          </button>
          <button onClick={handleCancel} className="btn btn-danger btn-custom">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

UserForm.propTypes = {
  edit: PropTypes.bool.isRequired,
  handleSetEdit: PropTypes.func,
};

export default UserForm;
