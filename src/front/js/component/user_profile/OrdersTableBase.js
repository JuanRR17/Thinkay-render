import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { customStyles } from "../../utils/tables-style";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

const _ = require("lodash");
const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const ProductsTableBase = (props) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [data, setData] = React.useState(props.data);

  const navigate = useNavigate();

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleSee = () => {
      navigate("/order/" + selectedRows[0].id);
    };

    return (
      <div>
        {selectedRows.length == 1 ? (
          <button
            key="see"
            onClick={handleSee}
            className="btn btn-success btn-custom"
          >
            <VisibilityOutlinedIcon />
          </button>
        ) : null}
      </div>
    );
  }, [data, selectedRows]);

  return (
    <>
      <DataTable
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
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
        selectableRowsSingle
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
