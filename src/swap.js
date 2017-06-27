import React from "react";
import { Button } from "reactstrap";
import { Field, reduxForm } from "redux-form/immutable";
import renderDropdown from "./renderDropdown";

const Swap = ({ style, rowIndices }) => {
  return (
    <form style={style}>
      <div>
        Swap rows{" "}
        <Field
          name="i"
          options={rowIndices}
          component={renderDropdown}
          parse={Number}
        />
        {" "}and{" "}
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
  form: "swap"
})(Swap);
