import React from "react";
import { reset } from "redux-form/immutable";
import { connect } from "react-redux";
import { ActionCreators } from "redux-undo";
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

const undoButton = ({ onClick }) => {
  return (
    <button type="button" className="btn btn-secondary" onClick={onClick}>
      Undo
    </button>
  );
};
const UndoButton = connect(null, dispatch => ({
  onClick: () => dispatch(ActionCreators.undo())
}))(undoButton);

const redoButton = ({ onClick }) => {
  return (
    <button type="button" className="btn btn-secondary" onClick={onClick}>
      Redo
    </button>
  );
};
const RedoButton = connect(null, dispatch => ({
  onClick: () => dispatch(ActionCreators.redo())
}))(redoButton);

const Footer = ({ onClick }) =>
  <div
    className="card-footer"
    style={{ display: "flex", justifyContent: "space-between", padding: 20 }}
  >
    <div className="btn-group" role="group">
      <UndoButton />
      <RedoButton />
    </div>
    <button className="btn btn-warning" onClick={onClick}>Reset</button>
  </div>;

export default connect(null, mapDispatchToProps)(Footer);
