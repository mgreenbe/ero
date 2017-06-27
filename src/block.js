import React from "react";
import Footer from "./footer.js";
import Entry from "./entry.js";
import MatrixView from "./matrix-view.js";
import RowOps from "./row-ops.js";
import "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const Block = () => {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  };
  return (
    <div style={style} className="card">
      <Entry />
      <MatrixView />
      <RowOps />
      <Footer />
    </div>
  );
};

export default Block;

/*
const applyRowOp = () => {
  const {
    matrix,
    selectedRowOp,
    swap_i,
    swap_j,
    scale_k,
    scale_i,
    transvect_k,
    transvect_i,
    transvect_j
  } = this.state;
  switch (selectedRowOp) {
    case "swap":
      this.setState({ matrix: matrix.swap(Number(swap_i), Number(swap_j)) });
      break;
    case "scale":
      this.setState({
        matrix: matrix.mul(scale_k, Number(scale_i))
      });
      break;
    case "transvect":
      this.setState({
        matrix: matrix.transvect(transvect_k, transvect_i, transvect_j)
      });
      break;
    default:
      console.log("Huh?");
  }
  console.log(this.state.selectedRowOp);
};
*/
