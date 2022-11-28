import React from "react";

const Footer = () => {
  const style = {
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
  };
  return (
    <footer
      style={style}
      className="footer text-center bg-success bg-gradient mt-auto px-5 pt-3 pb-2 mx-auto text-light fw-bolder"
    >
      <div>
        Developed by <br /> Juan Repeto & Ana Muñoz
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
