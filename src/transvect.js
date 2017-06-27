import React from "react";
import { Button } from "reactstrap";
import { Field, reduxForm } from "redux-form/immutable";
import renderDropdown from "./renderDropdown";

const Transvect = ({ style, rowIndices }) => {
  return (
    <form style={style}>
      <div>
        {"Add "}
        <Field
          style={{ textAlign: "center" }}
          type="text"
          size="5"
          name="k"
          component="input"
        />
        {" times row "}
        <Field
          name="i"
          options={rowIndices}
          component={renderDropdown}
          parse={Number}
        />
        {" to row "}
        <Field
          name="j"
          options={rowIndices}
          component={renderDropdown}
          parse={Number}
        />
        {"."}
      </div>
      <Button color="primary">Apply</Button>
    </form>
  );
};

export default reduxForm({
  form: "transvect"
})(Transvect);
