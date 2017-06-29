import React from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { set } from "./action-creators.js";
import { change } from "redux-form/immutable";
import isRef from "./is-ref.js";

const changes = ({ opType, i, j, k }) => {
  switch (opType) {
    case "swap":
      return [change("swap", "i", i), change("swap", "j", j)];
    case "multiply":
      return [
        change("multiply", "i", i),
        change("multiply", "k", k.toFraction())
      ];
    case "transvect":
      return [
        change("transvect", "i", i),
        change("transvect", "j", j),
        change("transvect", "k", k.toFraction())
      ];
    default:
      throw Error("Unknown opType.");
  }
};
const mapDispatchToProps = (dispatch, { status }) => {
  return {
    onClick: () => {
      dispatch(set("status", status));
      if (!status.value) {
        changes(status).forEach(action => dispatch(action));
      }
    }
  };
};
const hintButton = ({ onClick }) => {
  return <Button color="info" onClick={onClick}>Hint</Button>;
};
const HintButton = connect(null, mapDispatchToProps)(hintButton);

const mapStateToProps = state => {
  const matrix = state.getIn(["app", "matrix"]).arr.map(row => row.arr);
  return { matrix };
};
const hint = ({ matrix, style }) => {
  const status = isRef(matrix);
  return (
    <div style={style}>
      <span>Stuck on row reduction? Get the next step.</span>
      <HintButton status={status} />
    </div>
  );
};
const Hint = connect(mapStateToProps)(hint);

export default Hint;

/*function hintText({ value, opType, i, j, k }) {
  if (value) {
    return "The matrix is in row echelon form.";
  } else {
    switch (opType) {
      case "swap":
        return `Swap rows ${i} and ${j}.`;
      case "multiply":
        return `Multiply row ${i} by ${k.toFraction()}.`;
      case "transvect":
        return `Add ${k.toFraction()} times row ${i} to row ${j}.`;
      default:
        throw new Error("Error! Unrecognized operation type?");
    }
  }
}*/
