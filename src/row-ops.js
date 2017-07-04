import React from "react";
import { connect } from "react-redux";
import Swap from "./swap.js";
import Multiply from "./multiply.js";
import Transvect from "./transvect.js";
import Hint from "./hint";

const style = {
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center"
};

const rowOps = ({ nRows, status }) => {
  const rowIndices = nRows && Array(nRows).fill(null).map((x, i) => i);
  const opType = status && status.opType;
  const hilite = x => {
    return x === opType ? { backgroundColor: "pink" } : {};
  };
  return nRows
    ? <ul
        className="list-group list-group-flush"
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <li className="list-group-item highlight" style={hilite("swap")}>
          <Swap style={style} rowIndices={rowIndices} />
        </li>
        <li className="list-group-item highlight" style={hilite("multiply")}>
          <Multiply style={style} rowIndices={rowIndices} />
        </li>
        <li className="list-group-item highlight" style={hilite("transvect")}>
          <Transvect style={style} rowIndices={rowIndices} />
        </li>
        <li className="list-group-item" style={{ borderBottom: "None" }}>
          <Hint style={style} />
        </li>
      </ul>
    : null;
};

const mapStateToProps = state => {
  const matrix = state.present.getIn(["app", "matrix"]);
  const status = state.present.getIn(["app", "status"]);
  return {
    nRows: matrix ? matrix.length : undefined,
    status
  };
};

const RowOps = connect(mapStateToProps)(rowOps);

export default RowOps;
