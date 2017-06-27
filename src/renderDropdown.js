import React from "react";

const renderDropdown = ({ input, meta, options, ...props }) => {
  return (
    <select {...input} {...props}>
      {options.map(x => <option key={x} value={x}>{x}</option>)}
    </select>
  );
};

export default renderDropdown;
