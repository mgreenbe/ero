import React from "react";
import { Alert, Input, Button } from "reactstrap";
import VerticalSpacer from "./vertical-spacer.js";

import "bootstrap/dist/css/bootstrap.css";

const Entry = ({ entry, valid, errorMessage, handleChange, createMatrix }) => {
  return (
    <div
      className="card-block"
      style={{ display: "flex", alignItems: "flex-end" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        }}
      >
        <div><b>Enter matrix:</b></div>
        <div>
          <i>Separate entries with spaces, rows with semicolons.</i>
        </div>
        <VerticalSpacer />
        <Input
          name="entry"
          type="text"
          placeholder="1 0 0; 0 1 0; 0 0 1"
          value={entry}
          style={{ fontFamily: "monospace" }}
          onChange={handleChange}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }} />
        {!valid &&
          <div>
            <VerticalSpacer />
            <Alert style={{ marginBottom: 0 }} color="danger">
              {errorMessage}
            </Alert>
          </div>}
      </div>
      <Button style={{ marginLeft: 20 }} onClick={createMatrix} color="primary">
        Create
      </Button>
    </div>
  );
};

export default Entry;
