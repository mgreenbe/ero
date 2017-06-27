import React from "react";
import { connect } from "react-redux";

const renderRow = (row, i, nRows) => {
  return (
    <tr key={i}>
      {i === 0 &&
        <td
          rowSpan={nRows}
          style={{
            width: "5px",
            borderLeft: "solid 2px",
            borderTop: "solid 1px",
            borderBottom: "solid 1px"
          }}
        />}
      {row.map((entry, j) =>
        <td
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            textAlign: "right",
            fontFamily: "monospace",
            fontSize: 18
          }}
          key={j}
        >
          {entry.toFraction()}
        </td>
      )}
      {i === 0 &&
        <td
          rowSpan={nRows}
          style={{
            width: "5px",
            borderRight: "solid 2px",
            borderTop: "solid 1px",
            borderBottom: "solid 1px"
          }}
        />}
    </tr>
  );
};

const mapStateToProps = state => {
  return {
    matrix: state.getIn(["app", "matrix"])
  };
};

const matrixView = ({ matrix }) => {
  return (
    <div>
      {matrix &&
        matrix.length > 0 &&
        <div
          className="card-block"
          style={{
            display: "flex",
            justifyContent: "center",
            borderTop: "solid 1px rgba(0, 0, 0, 0.125)"
          }}
        >
          <table>
            <tbody>
              {matrix.arr.map((row, i) => renderRow(row.arr, i, matrix.length))}
            </tbody>
          </table>
        </div>}
    </div>
  );
};

const MatrixView = connect(mapStateToProps)(matrixView);

export default MatrixView;
