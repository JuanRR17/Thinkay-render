import React, { useContext, useState, useEffect, useMemo } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import MyOrdersTable from "../component/user_profile/MyOrdersTable";
import SoldOrdersTable from "../component/user_profile/SoldOrdersTable";
import UserForm from "../component/user_profile/UserForm";
import UserInfo from "../component/user_profile/UserInfo";
import UserProductsTable from "../component/user_profile/UserProductsTable";
import { BsJournalPlus } from "react-icons/bs";
import { FaUserSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../../styles/index.css";
import PropTypes from "prop-types";

const Profile = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const token = useMemo(() => store.token, [store.token]);
  const data = useMemo(() => {
    store.data;
  }, [store.data?.id]);

  const handleEditProfile = () => {
    setEdit(true);
  };
  useEffect(() => {
    actions.syncTokenFromSessionStore();

    if (!sessionStorage.getItem("token")) {
      actions.logout();
      navigate("/");
    }
    if (!data) {
      actions.getCurrentUserData();
    }
  }, [token, data]);

  return (
    <div className="container-fluid col-lg-8">
      <div className="row bg-custom">
        {edit ? (
          <UserForm edit={true} handleSetEdit={(value) => setEdit(value)} />
        ) : (
          <UserInfo data={store.data} handleEdit={handleEditProfile} />
        )}

        <div className=" p-0 panel" id="accordion">
          {/* My By-Products table */}
          <div className="panel-heading">
            <h2 className="panel-title " id="panelsStayOpen-headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                My By-Products
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div className="panel-body">
                <IconContext.Provider value={{ className: "p-1", size: 30 }}>
                  <button type="button" className="btn btn-success btn-custom">
                    <Link
                      to="/byproduct_form"
                      className="text-decoration-none text-light shadow"
                    >
                      <BsJournalPlus />
                    </Link>
                  </button>
                  <label className="ps-1">Create New By-Product</label>
                </IconContext.Provider>

                <UserProductsTable products={store.data?.products} />
              </div>
            </div>
          </div>
          {/* My Made Orders table */}
          <div className="panel-heading">
            <h2 className="panel-title" id="panelsStayOpen-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                My Made Orders
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingTwo"
            >
              <div className="panel-body">
                <MyOrdersTable />
              </div>
            </div>
          </div>
          {/* My Sold Orders table */}

          <div className="panel-heading">
            <h2 className="panel-title" id="panelsStayOpen-headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
              >
                My Sold Orders
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingThree"
            >
              <div className="panel-body">
                <SoldOrdersTable />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pt-3">
          {/* Button trigger modal */}

          <button
            type="button"
            className="btn btn-danger btn-custom"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <IconContext.Provider value={{ className: "", size: 35 }}>
              <FaUserSlash />
            </IconContext.Provider>
          </button>

          {/* <Modal> */}
          <div
            className="modal fade text-dark"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header justify-content-center bg-danger bg-opacity-75 bg-gradient text-light">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Delete Profile
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete your Profile?
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    type="button"
                    className="btn btn-danger btn-custom"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      actions.delete_profile(store.data.id);
                      actions.logout();
                    }}
                  >
                    Yes, Remove my Profile
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-custom"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
