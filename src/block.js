import React from "react";
import Header from "./header.js";
import Entry from "./entry.js";
import MatrixView from "./matrix-view.js";
import RowOps from "./row-ops.js";
import fraction from "./frac.js";
import { matrix } from "./vector.js";
import "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const initialState = {
  entry: "",
  entryValid: "true",
  entryErrorMessage: "",
  //  matrix: new Matrix([1, 2, 3], [4, 5, 6], [7, 8, 9]),
  selectedRowOp: "",
  swap_i: "",
  swap_iValid: "true",
  swap_iErrorMessage: "",
  swap_j: "",
  scale_k: "",
  scale_i: "",
  transvect_k: "",
  transvect_i: "",
  transvect_j: ""
};
class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateState(newState) {
    this.setState(newState);
  }

  createMatrix() {
    try {
      this.setState(
        {
          matrix: matrix(
            this.state.entry
              .split(/\s*;\s*/)
              .map(row => row.trim().split(/\s+/).map(x => fraction(x)))
          ),
          entryValid: true
        },
        () =>
          console.log(
            `size: ${this.state.matrix.length} x ${this.state.matrix.arr[0]
              .length}`
          )
      );
    } catch (e) {
      console.log(`Error caught: ${e.message}`);
      this.setState({
        entryValid: false,
        entryErrorMessage: "Couldn't parse input."
      });
    }
  }
  applyRowOp() {
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
  }

  render() {
    const { entry, matrix, ...rowOpProps } = this.state;
    const style = {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch"
    };
    return (
      <div style={style} className="card">
        <Entry
          entry={entry}
          valid={this.state.entryValid}
          errorMessage={this.state.entryErrorMessage}
          handleChange={this.handleChange.bind(this)}
          createMatrix={this.createMatrix.bind(this)}
        />
        {this.state.matrix && <MatrixView matrix={matrix.toArray()} />}
        <RowOps
          nRows={this.state.matrix ? this.state.matrix.length : undefined}
          disabled={!this.state.matrix}
          updater={this.updateState.bind(this)}
          handleChange={this.handleChange.bind(this)}
          applyRowOp={this.applyRowOp.bind(this)}
          {...rowOpProps}
        />
        <Header />
      </div>
    );
  }
}

export default Block;
