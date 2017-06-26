import React from "react";

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

const MatrixView = ({ matrix }) => {
  return (
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
          {matrix.map((row, i) => renderRow(row, i, matrix.length))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixView;
