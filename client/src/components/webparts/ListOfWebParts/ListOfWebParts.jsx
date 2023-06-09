import React from "react";


const ListOfWebParts = ({ visible, callback }) => (
  <div
    style={{
      display: visible ? "block" : "none",
      position: "relative"
    }}
  >
    <button onClick={callback}>Label</button>
    <button>Image</button>
    <button>Section</button>
  </div>
);

export default ListOfWebParts;
