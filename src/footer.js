import React from "react";
import { Button } from "reactstrap";
import { reset } from "redux-form/immutable";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(reset("entry"));
      dispatch(reset("swap"));
      dispatch(reset("multiply"));
      dispatch(reset("transvect"));
      dispatch({
        type: "set",
        payload: { key: "matrix", value: undefined }
      });
      dispatch({
        type: "set",
        payload: { key: "status", value: undefined }
      });
    }
  };
};

const Footer = ({ onClick }) =>
  <div
    className="card-footer"
    style={{ display: "flex", justifyContent: "flex-end", padding: 20 }}
  >
    <Button onClick={onClick} color="warning">Reset</Button>
  </div>;

export default connect(null, mapDispatchToProps)(Footer);
