import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tables-style";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import "../../../styles/index.css";

const _ = require("lodash");
const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const ProductsTableBase = (props) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(props.data);
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.name
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(_.difference(data, selectedRows));
        selectedRows.forEach((p) => {
          actions.delete_product(p.id);
        });
      }
    };
    const handleEdit = () => {
      actions.toggle_update();
      navigate("/byproduct_form/" + selectedRows[0].id);
    };
    const handleSee = () => {
      navigate("/product/" + selectedRows[0].id);
    };
    return (
      <div className="py-2 d-flex gap-2">
        <button
          key="delete"
          onClick={handleDelete}
          className="btn btn-danger btn-custom"
        >
          <DeleteIcon />
        </button>
        {selectedRows.length == 1 ? (
          <>
            <button
              key="see"
              onClick={handleSee}
              className="btn btn-success btn-custom"
            >
              <VisibilityOutlinedIcon />
            </button>
            <button
              key="edit"
              onClick={handleEdit}
              className="btn btn-warning btn-custom"
            >
              <EditIcon />
            </button>
          </>
        ) : null}
      </div>
    );
  }, [data, selectedRows, toggleCleared]);

  return (
    <>
      <DataTable
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        direction="auto"
        highlightOnHover
        pagination
        responsive
        selectableRows
        selectableRowsComponent={Checkbox}
        selectableRowsComponentProps={selectProps}
        selectableRowsHighlight
        selectableRowsNoSelectAll
        selectableRowsRadio="radio"
        sortIcon={sortIcon}
        striped
        subHeaderAlign="right"
        subHeaderWrap
        {...props}
        customStyles={customStyles}
      />
    </>
  );
};

export default ProductsTableBase;
