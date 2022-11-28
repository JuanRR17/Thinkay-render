import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  const handleLogin = async () => {
    let select_errors;
    if (!password) {
      select_errors = { ...select_errors, password: "Enter a password" };
    }
    if (!email) {
      select_errors = { ...select_errors, email: "Enter an email" };
    }
    //Check if any error exists
    if (select_errors) {
      setErrors(select_errors);
      actions.clearmessage();
      return;
    } else if (errors) {
      setErrors("");
    }
    await actions.login(email, password);
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    if (store.token && store.token != "") navigate("/profile");
  }, [store.token]);

  useEffect(() => {
    actions.clearmessage();
  }, []);

  return (
    <div className="m-auto bg-custom">
      <div className="login">
        <h1 className=" text-center">Login</h1>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className=" form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className=" form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors?.password ? (
            <div className="text-error">{errors?.password}</div>
          ) : null}
          {store.message && (
            <div className="text-error mb-3">{store.message}</div>
          )}
        </div>

        <div className="py-2 d-flex gap-2">
          <button className="btn btn-success btn-custom" onClick={handleLogin}>
            Login
          </button>
          <button onClick={handleCancel} className="btn btn-danger btn-custom ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
