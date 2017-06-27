import React from "react";
import { SubmissionError } from "redux-form/immutable";
import { Field, reduxForm, reset } from "redux-form/immutable";
import { Alert, Button } from "reactstrap";
import VerticalSpacer from "./vertical-spacer.js";
import Fraction from "fraction.js";
import { matrix } from "./vector.js";

const parseFraction = x => {
  try {
    return new Fraction(x);
  } catch (e) {
    throw new Error(`Couldn't parse the expression "${x}".`);
  }
};

const createMatrix = matrixString => {
  return matrix(
    matrixString
      .split(/\s*;\s*/)
      .map(row => row.trim().split(/\s+/).map(parseFraction))
  );
};

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const matrix = createMatrix(values.get("matrixString"));
      resolve(matrix);
    } catch (e) {
      reject(e.message);
    }
  })
    .catch(message => {
      throw new SubmissionError({ matrixString: message });
    })
    .then(matrix => {
      dispatch(reset("swap"));
      dispatch(reset("multiply"));
      dispatch(reset("transvect"));
      dispatch({
        type: "set",
        payload: { key: "matrix", value: matrix }
      });
    });
};

const renderInput = ({ input, meta }) => {
  return (
    <div>
      <input
        {...input}
        placeholder="1 0 0; 0 1 0; 0 0 1"
        className="form-control"
        style={{ fontFamily: "monospace", fontSize: 16 }}
      />
      {meta.error &&
        <div>
          <VerticalSpacer />
          <Alert style={{ marginBottom: 0 }} color="danger">
            {meta.error}
          </Alert>
        </div>}
    </div>
  );
};

const Entry = ({ handleSubmit }) => {
  return (
    <form
      className="card-block"
      style={{ display: "flex", alignItems: "flex-end" }}
      onSubmit={handleSubmit(submit)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        }}
      >
        <div>
          <i>
            Enter a matrix. Separate entries with spaces, rows with semicolons.
          </i>
        </div>
        <VerticalSpacer />
        <Field name="matrixString" type="text" component={renderInput} />
        <div />
      </div>
      <Button type="submit" style={{ marginLeft: 20 }} color="success">
        Create
      </Button>
    </form>
  );
};

export default reduxForm({
  form: "entry",
  initialValues: { matrixString: "" }
})(Entry);
