import React from "react";

import { useState } from "react";
import styles from "../webpartStyles.module.css";
import ListOfWebParts from "../ListOfWebParts/ListOfWebParts";
import {
  AppRegistry,
  Alert,
  Pressable,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";


const LabelWebPart = ({
  title,
  width,
  height,
  color,
  backgroundColor,
  border,
  textAlign,
  alignVertical,
  editMode
}) => {
  const [isEditPanelVisible, setIsEditPanelVisible] = useState(false);
  const [textValue, setTextValue] = useState("Helloooo");
  // const [titleVal, setTitleVal] = useState(title);
  // const [widthVal, setWidthVal] = useState(width);
  // const [heightVal, setHeightVal] = useState(height);
  const [colorVal, setColorVal] = useState(color);
  const [backgroundColorVal, setBackgroundColorVal] = useState(backgroundColor);
  // const [borderVal, setBorderVal] = useState(border);
  // const [textAlignVal, setTextAlignVal] = useState(textAlign);
  // const [alignVerticalVal, setAlignVerticalVal] = useState(alignVertical);
  return (
    <div className={styles.containerEditMode} id="WebPartOuterContainer">
      <Modal
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: "white" }}
        visible={isEditPanelVisible}
        onRequestClose={() => {
          setIsEditPanelVisible(!isEditPanelVisible);
        }}
      >
        <View style={{ backgroundColor: "white", height: "100%" }}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsEditPanelVisible(!isEditPanelVisible)}
            >
              <Text
                style={{
                  color: "red",
                  border: "2px solid grey",
                  backgroundColor: "white",
                  fontSize: "20px",
                  width: "50px",
                  height: "34px",
                  paddingLeft: "20px"
                }}
              >
                X
              </Text>
            </Pressable>
            <Text style={{ fontWeight: "700", fontSize: "20px" }}>
              Configure Webpart
            </Text>
            <Text style={{ fontWeight: "400", fontSize: "16px" }}>
              Edit Text
            </Text>
            <TextInput
              style={{ height: "40px", border: "2px solid black" }}
              onChangeText={(val) => {
                setTextValue(val);
              }}
              value={textValue}
            />
            <Text style={{ fontWeight: "400", fontSize: "16px" }}>
              Edit Color
            </Text>
            <TextInput
              style={{ height: "40px", border: "2px solid black" }}
              onChangeText={(val) => {
                setColorVal(val);
              }}
              value={colorVal}
            />
            <Text style={{ fontWeight: "400", fontSize: "16px" }}>
              Edit Background Color
            </Text>
            <TextInput
              style={{ height: "40px", border: "2px solid black" }}
              onChangeText={(val) => {
                setBackgroundColorVal(val);
              }}
              value={backgroundColorVal}
            />
          </View>
        </View>
      </Modal>

      <div style={{ width: "100%" }} id="container">
        <button
          onClick={() => {
            setIsEditPanelVisible(!isEditPanelVisible);
          }}
          id="EditableContainer"
          style={{
            color: "black",
            border: "2px solid grey",
            backgroundColor: "white",
            fontSize: "12px",
            width: "100px",
            height: "34px",
            display: editMode ? "block" : "none"
          }}
        >
          Edit Webpart
        </button>
        <button
          onClick={() => {
            setIsEditPanelVisible(!isEditPanelVisible);
          }}
          id="EditableContainer"
          style={{
            color: "black",
            border: "2px solid grey",
            backgroundColor: "white",
            fontSize: "12px",
            width: "100px",
            height: "34px",
            display: editMode ? "block" : "none"
          }}
        >
          Delete Webpart
        </button>
        <View style={{ verticalAlign: "middle" }}>
          <Text
            style={{
              color: colorVal,
              backgroundColor: backgroundColorVal,
              width: "100%",
              height: height,
              textAlign: textAlign
            }}
          >
            {textValue}
          </Text>
        </View>
      </div>
    </div>
  );
};

export default LabelWebPart;
