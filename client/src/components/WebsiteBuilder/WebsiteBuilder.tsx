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
import ReactDOM from 'react-dom/client';

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
    //Process Website - remove all configurable elements 

    // Conversion
    let varSave = await HTMLParser(varel, true);
    WebsiteBuilder.varOutputWebsite = await JSONToHTML(varSave, false); // Default: true - true: return HTML String, false: return HTML Element
    console.log(varSave);
  };
  componentDidMount(): void {
    console.log("compo mount")
    
  }
  componentDidUpdate(prevProps: Readonly<IWebsiteBuilderProps>, prevState: Readonly<IWebsiteBuilderStates>, snapshot?: any): void {
    console.log("Compo update")
    if(!this.state.editMode){
      const container:any = document.getElementById('htmlParsedValue');
      // const root = ReactDOM.createRoot(container);
      // console.log("{WebsiteBuilder.varOutputWebsite}: ", WebsiteBuilder.varOutputWebsite)
      // root.render(WebsiteBuilder.varOutputWebsite);
      container.innerHTML=WebsiteBuilder.varOutputWebsite;
    }
  }
  public render(){
    
      return(
        
        <div className="App">
          <div style={{ display: "flex", padding: "20px" }}>
          <Text>Switch Modes(Edit Mode/ View Mode): </Text>
          <Switch
            onValueChange={(val:any) => {
              this.setState({editMode:val}) 
              
            }}
            value={this.state.editMode}
          />
        </div>
        {(this.state.editMode)?
        <>
          <div id="rootWebsite">
            <div id="websiteBoundary">
              <SLineWebSection title={""} editMode={true} />
            </div>
          </div>
          <Button
            onPress={this.convertJsxToJson}
            title="Save"
          />
        </>
        :
        <div id="htmlParsedValue">
          
        </div>
        }
        </div>
    );
  }

}
