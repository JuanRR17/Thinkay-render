export const customStyles = {
  table: {
    style: {
      boxShadow: "inset 0 0 1em 0.8em rgba(20, 48, 9, 0.8)",
      marginBottom: "0.8em",
      borderRadius: "1.3em",
      overflow: "hidden",
    },
  },
  header: {
    style: {
      color: "transparent",
      backgroundColor: "unset",
    },
  },
  head: {
    style: {
      color: "green",
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  headRow: {
    style: {
      backgroundColor: "#eead35",
      boxShadow: "inset 0 0.8em 1.3em 0 rgba(20, 48, 9, 0.8)",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffffd3",
    },
    selectedHighlightStyle: {
      "&:nth-of-type(n)": {
        color: "black",
        backgroundColor: "#ffc459",
        borderBottomColor: "orange",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "#eead35ab",
    },
    stripedStyle: {
      color: "white",
      backgroundColor: "#7b9251bf",
    },
  },
  cells: {
    style: {
      backgroundColor: "unset",
    },
  },
  contextMenu: {
    style: {
      backgroundColor: "#8db77b",
      borderRadius: "0.8em",
    },
  },
  pagination: {
    style: {
      color: "white",
      fontSize: "0.9rem",
      minHeight: "3.5em",
      backgroundColor: "unset",
      borderTopStyle: "solid",
      borderTopWidth: "0.1em",
    },
    pageButtonsStyle: {
      color: "white",
      backgroundColor: "white",
      padding: "0.1em",
      margin: "0.1em",
    },
  },
  noData: {
    style: {
      color: "#ffffffd3",
      backgroundColor: "rgba(20, 48, 9)",
      fontSize: "1.5rem",
      fontWeight: "600",
    },
  },
};
