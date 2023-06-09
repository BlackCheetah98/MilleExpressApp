import React from "react";
// import "./styles.css";
// import {serialize} from "react-serialize"
import LabelWebPart from "../webparts/LabelWebPart/LabelWebPart";
import SLineWebSection from "../webparts/SLineWebSection/SLineWebSection";
import HTMLParser from 'html-to-json-parser';
import { JSONToHTML } from 'html-to-json-parser';
import { webApiEndPoint } from "../../constants";
// import {View, StyleSheet, Button, Alert} from 'react-native';
import {
  Switch,
  StyleSheet,
  Alert,
  Text,
  View,
  TextInput,
  Button
} from "react-native-web" ;

interface IWebsiteBuilderProps{
  editMode:boolean;
  siteStore:string;
}

interface IWebsiteBuilderStates{
  editMode:boolean;
  siteStore:string;
}
export default class WebsiteBuilder extends React.Component<IWebsiteBuilderProps,IWebsiteBuilderStates>{

  private static varSiteStore:any;
  private static varOutputWebsite:any;

  constructor(props: IWebsiteBuilderProps) {
    super(props);
    fetch(webApiEndPoint+'/users').then((res:any) => res.json()).then((response:any) => this.setState({ siteStore:response }));
    this.state = {editMode: this.props.editMode,siteStore:this.props.siteStore};
  }
  
  private convertJsxToJson = async () => {
    // console.log("3: ", WebsiteBuilder.varSiteStore);
    // let varSave = serialize(App.varSiteStore);
    let varel :any = '<div><ul><li>Hello <strong>World</strong></li></ul></div>'; 
    varel = document.getElementById("rootWebsite");
    // Conversion
    let varSave = await HTMLParser(varel, true);
    WebsiteBuilder.varOutputWebsite = await JSONToHTML(varSave, false); // Default: true - true: return HTML String, false: return HTML Element
    console.log(varSave);
    Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      console.log("alerted");
  };

  public render(){
    
    if(this.state.editMode) {
      console.log("edit mode true")
      return(
        
        <div className="App">
          <div style={{ display: "flex", padding: "20px" }}>
          <Text>Switch Modes: </Text>
          <Switch
            onValueChange={(val:any) => {
              this.setState({editMode:val}) 
              
            }}
            value={this.state.editMode}
          />
        </div>
        
        <div id="rootWebsite">
          <div id="websiteBoundary">
            <SLineWebSection title={""} editMode={true} />
          </div>
          </div>
        <Button
          onPress={this.convertJsxToJson}
          title="Save"
        />
        </div>
      );
    }
    else {
      console.log("edit mode false");
      return(
        <div className="App">
          {WebsiteBuilder.varOutputWebsite}
        </div>
      )
    }
  }

}
