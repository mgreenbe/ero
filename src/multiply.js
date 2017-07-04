import React from "react";
import { Alert, Button } from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form/immutable";
import renderDropdown from "./renderDropdown.js";
import VerticalSpacer from "./vertical-spacer.js";
import Fraction from "fraction.js";
import { multiplyOp } from "./action-creators.js";

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
      const k = parseFraction(values.get("k"));
      if (k.valueOf() !== 0) {
        resolve({ i, k });
      } else {
        reject(
          <span>Multiplying a row by 0 isn't an elementary row operation.</span>
        );
      }
    } catch (e) {
      reject(e.message);
    }
  })
    .catch(_error => {
      throw new SubmissionError({ _error });
    })
    .then(({ i, k }) => {
      dispatch(multiplyOp(i, k));
    });
};

const Multiply = ({ style, rowIndices, handleSubmit, error }) => {
  return (
    <form style={style} onSubmit={handleSubmit(submit)}>
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
          style={{ textAlign: "center", fontFamily: "monospace", fontSize: 16 }}
          type="text"
          size="5"
          name="k"
          component="input"
        />
        {"."}
        {error &&
          <div><VerticalSpacer /><Alert color="danger">{error}</Alert></div>}
      </div>
      <Button color="primary">Apply</Button>
    </form>
  );
};

const initialValues = { i: 0, k: "" };
export default reduxForm({
  form: "multiply",
  initialValues,
  getFormState: state => state.present.get("form")
})(Multiply);
