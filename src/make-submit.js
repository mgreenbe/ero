const makeSubmit = (executor, onResolve, onReject) => (values, dispatch) => {
  return new Promise(executor).catch(onResolve).then(onReject);
};

export default makeSubmit;
