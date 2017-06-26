import React from "react";
import { Button } from "reactstrap";
import VerticalSpacer from "./vertical-spacer.js";

const ensureInteger = (event, min, max) => {
  let num, update;
  const prop = event.target.name;
  const validProp = prop + "Valid";
  const messageProp = prop + "ErrorMessage";
  const message = `Row indices must be integers between ${min} and ${max}.`;
  try {
    num = Number(event.target.value);
  } catch (err) {
    update = {
      [prop]: event.target.value,
      [validProp]: false,
      [messageProp]: message
    };
    console.log(update);
    return update;
  }

  update = Number.isInteger(num) && num >= min && num <= max
    ? { [prop]: event.target.value, [validProp]: true }
    : {
        [prop]: event.target.value,
        [validProp]: false,
        [messageProp]: message
      };
  console.log(update);
  return update;
};

const test = (updater, validator, ...args) => {
  return event => updater(validator(event, ...args));
};

const RowOps = props => {
  const {
    selectedRowOp,
    swap_i,
    swap_j,
    scale_i,
    scale_k,
    transvect_k,
    transvect_i,
    transvect_j,
    disabled,
    applyRowOp,
    handleChange,
    updater,
    nRows
  } = props;
  return (
    <div
      className="card-block"
      style={{
        display: "flex",
        flexDirection: "column",
        borderTop: "solid 1px rgba(0, 0, 0, 0.125)"
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: 5
          }}
        >
          <input
            name="selectedRowOp"
            type="radio"
            value="swap"
            disabled={disabled}
            checked={selectedRowOp === "swap"}
            onChange={handleChange}
          />
        </div>
        <div>
          Swap rows{" "}
          <input
            name="swap_i"
            type="number"
            max="99"
            min="0"
            size="7"
            value={swap_i}
            disabled={disabled || selectedRowOp !== "swap"}
            onChange={test(updater, ensureInteger, 0, nRows - 1)}
          />
          {" "}and{" "}
          <input
            name="swap_j"
            type="number"
            max="99"
            min="0"
            size="7"
            maxLength="7"
            value={swap_j}
            disabled={disabled || selectedRowOp !== "swap"}
            onChange={handleChange}
          />
        </div>
      </div>
      <VerticalSpacer />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: 5
          }}
        >
          <input
            style={{ paddingTop: 5 }}
            name="selectedRowOp"
            type="radio"
            value="scale"
            checked={selectedRowOp === "scale"}
            disabled={disabled}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            Multiply row{" "}
            <input
              name="scale_i"
              type="number"
              max="99"
              min="0"
              size="7"
              value={scale_i}
              disabled={disabled || selectedRowOp !== "scale"}
              onChange={handleChange}
            />
            {" "}by{" "}
            <input
              name="scale_k"
              type="text"
              size="4"
              value={scale_k}
              disabled={disabled || selectedRowOp !== "scale"}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <VerticalSpacer />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: 5
          }}
        >
          <input
            name="selectedRowOp"
            type="radio"
            value="transvect"
            checked={selectedRowOp === "transvect"}
            disabled={disabled}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            Add{" "}
            <input
              name="transvect_k"
              type="text"
              size="4"
              value={transvect_k}
              disabled={disabled || selectedRowOp !== "transvect"}
              onChange={handleChange}
            />
            {" "}times row{" "}
            <input
              name="transvect_i"
              type="number"
              max="99"
              min="0"
              size="7"
              value={transvect_i}
              disabled={disabled || selectedRowOp !== "transvect"}
              onChange={handleChange}
            />
            {" "}to row{" "}
            <input
              name="transvect_j"
              type="number"
              max="99"
              min="0"
              size="7"
              value={transvect_j}
              disabled={disabled || selectedRowOp !== "transvect"}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <VerticalSpacer />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="primary" onClick={applyRowOp} disabled={disabled}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default RowOps;
