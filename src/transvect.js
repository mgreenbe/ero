import React from "react";
import { Alert, Button } from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form/immutable";
import renderDropdown from "./renderDropdown";
import Fraction from "fraction.js";
import VerticalSpacer from "./vertical-spacer.js";
import { transvectOp } from "./action-creators.js";

const parseFraction = x => {
  if (!x || (typeof x === "string" && x.trim() === "")) {
    throw new Error("You have to fill in all the fields.");
  } else {
    try {
      return new Fraction(x);
    } catch (e) {
      throw new Error(`Couldn't parse the expression "${x}".`);
    }
  }
};

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const i = values.get("i");
      const j = values.get("j");
      const k = parseFraction(values.get("k"));
      if (i === j && k.valueOf() === -1) {
        reject(
          <span>
            Subtracting a row from itself isn't an elementary row operation.
          </span>
        );
      } else {
        resolve({ i, j, k });
      }
    } catch (e) {
      reject(e.message);
    }
  })
    .catch(_error => {
      throw new SubmissionError({ _error });
    })
    .then(({ i, j, k }) => {
      dispatch(transvectOp(i, j, k));
    });
};

const Transvect = ({ style, rowIndices, handleSubmit, error }) => {
  return (
    <form style={style} onSubmit={handleSubmit(submit)}>
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
        {error &&
          <div>
            <VerticalSpacer />
            <Alert style={{ marginRight: 20 }} color="danger">{error}</Alert>
          </div>}
      </div>
      <Button color="primary">Apply</Button>
    </form>
  );
};

const initialValues = { i: 0, j: 1, k: "" };
export default reduxForm({
  form: "transvect",
  initialValues,
  getFormState: state => state.present.get("form")
})(Transvect);
