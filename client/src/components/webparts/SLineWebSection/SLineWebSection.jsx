import React from "react";
import { useState } from "react";
import styles from "../webpartStyles.module.css";
import ListOfWebParts from "../ListOfWebParts/ListOfWebParts";
import LabelWebPart from "../LabelWebPart/LabelWebPart";

const SLineWebSection = ({ title, editMode }) => {
  const [isAddPanelVisible, setIsAddPanelVisible] = useState(false);
  const [arrJSXChildrens, setArrJSXChildrens] = useState([]);

  const callbackFn = () => {
    setArrJSXChildrens([
      ...arrJSXChildrens,
      <LabelWebPart
        title="Sample Text"
        height="100px"
        backgroundColor="White"
        color="Black"
        textAlign="end"
        editMode={editMode}
      />
    ]);
  };
  const addButton = (
    <button
      onClick={() => {
        setIsAddPanelVisible(!isAddPanelVisible);
      }}
      id="EditableContainer"
      style={{
        color: "white",
        backgroundColor: "grey",
        fontSize: "30px",
        width: "100%",
        height: "34px",
        opacity: "0.4"
        // display: editMode ? "block" : "none"
      }}
    >
      +
    </button>
  );
  return (
    <div style={{ border: "1px lightblue solid", padding: "5px" }}>
      {arrJSXChildrens.map((el) => el)}
      <div style={{ display: editMode ? "block" : "none" }}>
        {addButton}
        <ListOfWebParts visible={isAddPanelVisible} callback={callbackFn} />
      </div>
    </div>
  );
};

export default SLineWebSection;

/*

      <LabelWebPart
        title="Hello worldy, and people"
        height="100px"
        backgroundColor="red"
        color="white"
        textAlign="end"
        editMode={true}
      />
*/
