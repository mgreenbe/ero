import { reset } from "redux-form/immutable";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(reset("entry"));
      dispatch(reset("swap"));
      dispatch(reset("multiply"));
      dispatch(reset("transvect"));
    }
  };
};
