import React from "react";
import { Button } from "reactstrap";

const Header = () =>
  <div
    className="card-footer"
    style={{ display: "flex", justifyContent: "flex-end", padding: 20 }}
  >
    <Button color="primary">Reset</Button>
  </div>;

export default Header;
