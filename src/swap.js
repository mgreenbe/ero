import React from "react";
import { Alert, Button } from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form/immutable";
import VerticalSpacer from "./vertical-spacer.js";
import renderDropdown from "./renderDropdown.js";
import { swapOp } from "./action-creators.js";

const submit = (values, dispatch) => {
  const i = values.get("i");
  const j = values.get("j");
  return new Promise((resolve, reject) => {
    if (i !== j) {
      resolve({ i, j });
    } else {
      reject(<span>You just swapped a row with itself.</span>);
    }
  })
    .catch(_error => {
      throw new SubmissionError({ _error });
    })
    .then(({ i, j }) => {
      dispatch(swapOp(i, j));
    });
};

const Swap = ({ style, rowIndices, handleSubmit, error }) => {
  return (
    <form style={style} onSubmit={handleSubmit(submit)}>
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
        {error &&
          <div><VerticalSpacer /><Alert color="warning">{error}</Alert></div>}
      </div>
      <Button type="submit" color="primary">Apply</Button>
    </form>
  );
};

export default reduxForm({
  form: "swap",
  initialValues: { i: 0, j: 1 },
  getFormState: state => state.present.get("form")
})(Swap);
