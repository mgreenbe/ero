import React from "react";
import { connect } from "react-redux";
import Swap from "./swap.js";
import Multiply from "./multiply.js";
import Transvect from "./transvect.js";

const style = {
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center"
};

const rowOps = ({ nRows }) => {
  const rowIndices = nRows && Array(nRows).fill(null).map((x, i) => i);
  return nRows
    ? <ul
        className="list-group list-group-flush"
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <li className="list-group-item">
          <Swap style={style} rowIndices={rowIndices} />
        </li>
        <li className="list-group-item">
          <Multiply style={style} rowIndices={rowIndices} />
        </li>
        <li className="list-group-item" style={{ borderBottom: "None" }}>
          <Transvect style={style} rowIndices={rowIndices} />
        </li>
      </ul>
    : null;
};

const mapStateToProps = state => {
  const matrix = state.getIn(["app", "matrix"]);
  return {
    nRows: matrix ? matrix.length : undefined
  };
};

const RowOps = connect(mapStateToProps)(rowOps);

export default RowOps;
