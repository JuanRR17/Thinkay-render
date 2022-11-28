import React from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import PropTypes from "prop-types";

const BackButton = ({ route }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-danger btn-custom m-2 me-auto"
      onClick={() => navigate(route)}
    >
      <TiArrowBackOutline /> Back
    </button>
  );
};

BackButton.propTypes = { route: PropTypes.string.isRequired };

export default BackButton;
