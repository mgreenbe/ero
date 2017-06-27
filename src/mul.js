import React from "react";
import { Button } from "reactstrap";
import { Field, reduxForm } from "redux-form/immutable";
import renderDropdown from "./renderDropdown";

const parse = x => Number(x);

const Multiply = ({ style, nRows }) => {
  const options = nRows ? Array(nRows).fill(null).map((x, i) => i) : [];
  return (
    <form style={style}>
      <div>
        Multiply row{" "}
        <Field
          name="i"
          options={options}
          component={renderDropdown}
          parse={x => Number(x)}
        />
        {" "}by{" "}
        <Field
          style={{ textAlign: "right" }}
          type="text"
          size="3"
          name="k"
          component="input"
        />
        {"."}
      </div>
      <Button color="primary">Apply</Button>
    </form>
  );
};

const initialValues = { k: undefined, i: undefined };

export default reduxForm({
  form: "multiply",
  initialValues
})(Multiply);
