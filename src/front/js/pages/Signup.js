import React from "react";
import "../../styles/home.css";
import UserForm from "../component/user_profile/UserForm";

export const SignUp = () => {
  return (
    <div className="container m-auto bg-custom">
      <UserForm edit={false} />
    </div>
  );
};
