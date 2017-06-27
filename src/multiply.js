import React from "react";
import { Button } from "reactstrap";
import { Field, reduxForm } from "redux-form/immutable";
import renderDropdown from "./renderDropdown";

const Multiply = ({ style, rowIndices }) => {
  return (
    <form style={style}>
      <div>
        Multiply row{" "}
        <Field
          name="i"
          options={rowIndices}
          component={renderDropdown}
          parse={Number}
        />
        {" "}by{" "}
        <Field
          style={{ textAlign: "center" }}
          type="text"
          size="5"
          name="k"
          component="input"
        />
        {"."}
      </div>
      <Button color="primary">Apply</Button>
    </form>
  );
};

export default reduxForm({
  form: "multiply"
})(Multiply);
