import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import WebsiteBuilder from './components/WebsiteBuilder/WebsiteBuilder';
import { webApiEndPoint } from './constants';
import {
  Switch,
  StyleSheet,
  Alert,
  Text,
  View,
  TextInput
} from "react-native-web" ;
import {Button, Modal, message, Form, Input, Tabs} from 'antd';
import { EnvironmentOutlined,LockOutlined, SearchOutlined, ShoppingCartOutlined, CaretDownOutlined, MinusOutlined ,PlusOutlined, EditOutlined } from '@ant-design/icons';
import Home from './pages/Home';

function App() {
  function sendRequest()  {
    axios.post(webApiEndPoint + '/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
  const [screen,changeScreen] = useState("HOME");
  return (
    <div className="App">
        <Modal
          open={isLoginPanelOpen}
          title={"Login/Register"}
          footer={[]}
          onCancel={() => { setIsLoginPanelOpen(false); } }
        >
          <LoginFragment closePanel={() => { setIsLoginPanelOpen(false); } } setLoginStatus={(val:any) => { setIsLoggedIn(val); } } />
        </Modal>
      
      <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>   
        <img src={require("./logologo.png")} style={{height:"50px",objectFit:"cover"}} />
        <h5 style={{fontFamily:"cursive",fontSize:"16px",padding:"0px",margin:"0px",width:"80%"}}>Webspaces </h5>
        <Button style={{margin:'10px'}} onClick={()=>{setIsLoginPanelOpen(true)}} type="primary"> Get Started </Button>
        
        {
          (isLoggedIn)?
          <Button style={{margin:'10px'}} onClick={()=>{changeScreen("BUILD")}} type="default"> Create my site </Button>
          :
          <Button style={{margin:'10px'}} onClick={()=>{setIsLoginPanelOpen(true)}} type="default"> Login </Button>
        }
      </div>
      {
        (screen=="HOME")?
        <Home changeScreen={changeScreen}/>:
        <WebsiteBuilder editMode={true} siteStore={""} /> 
      }
    </div>
  );
}


const LoginFragment = (props:any)=>{  
  const [isRegisterPopup, setIsRegisterPopup] = useState(false);
  const [currentTabIndex,setCurrentTabIndex] = useState("1");
  useEffect(()=>{

  },[]);
  const onChange = (e:any) => {
    // console.log(e)
    setCurrentTabIndex(e);
  };
  
  const onFinish =  async (values:any) =>{
  
    try {
      console.log("login panel onfinish",webApiEndPoint+'/loginUserUsingEmail')
      axios.post(webApiEndPoint+'/loginUserUsingEmail', values).then((response)=>{
        // setRefresherCount(refresherCount+1);
        console.log("response: ", response.data);
        if(response.data.message == "USEREXIST")  {
          if(response.data.isMatch) {
            sessionStorage.setItem("isAuthenticated", "true");
            sessionStorage.setItem("currentUserObj", JSON.stringify(response.data.userObj));
            message.success("Login successful");
            props.closePanel();
            props.setLoginStatus(true);
          }
          else{
            message.error("Invalid Username or password");
          }
        }
        else{
          sessionStorage.setItem("isAuthenticated", "false");
          message.success("User account not created");
        }
      });
    
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  const onFinishRegister =  async (values:any) =>{
    console.log("register onfinish")
    if(values.retypepassword === values.password){
      try {
        console.log(values);
        axios.post(webApiEndPoint+'/registerUser', values).then((response)=>{
          if(response.data.message==="USEREXISTS"){
            message.error("User mobile already registered");
          }
          else {
            message.success("Registration successful !!!");
            setIsRegisterPopup(false);
            
          }
        });
      
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else{
      message.error("Password and retype password doesnt match !!")
    }
    
  }

  return (
    <>
      {(isRegisterPopup)?
      <>
        <Form
          onFinish={onFinishRegister}
          disabled={false}
          layout="vertical"
        >
          <Form.Item label="Name" name="name" required rules={[{ required: true, message: 'Name is Required !' }]} tooltip="Name">
            <Input type="name" placeholder="Enter User's Name here" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone" required rules={[{ required: true, message: 'Phone Number is Required !' }]} tooltip="Phone Number">
            <Input type="number" placeholder="Enter Phone Number here" />
          </Form.Item>
          <Form.Item label="User Email" name="email" rules={[{ required: false }]} tooltip="User Email">
            <Input type="email" placeholder="Enter User Email Here " />
          </Form.Item>
          <Form.Item label="Password" name="password"  required rules={[{ required: true, message: 'Password is Required !' }]} tooltip="Password">
            <Input type="password" placeholder="Enter Password here" />
          </Form.Item>
          <Form.Item label="Retype Password" name="retypepassword"  required rules={[{ required: true, message: 'Password retype is Required !' }]} tooltip="Password">
            <Input type="password" placeholder="Enter Password here" />
          </Form.Item>
          
          <div style={{display:"flex"}}>
            <Button key="back" type={"link"} onClick={()=>{}}>
              Already have an account
            </Button>
            <Form.Item>
              <Button htmlType="submit" key="submit" type="primary" onClick={()=>{props.closePanel();props.setLoginStatus(true);}}>
                Register
              </Button>
            </Form.Item>
          </div>

        </Form>
        
      </>:
      <>
      <Tabs defaultActiveKey={currentTabIndex} items={[
        {
          label: 'Using Email Address',
          key: '1',
          // children: 'Tab 1',
        },
        // {
        //   label: 'Use Mobile OTP',
        //   key: '2',
        //   children: 'Tab 2',
        //   disabled: true,
        // }
        ]} onChange={onChange} />

        <div className="login-container">
          
        {(currentTabIndex=='1')?
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            className="login-form"
          >
            {/* <Button onClick={()=>{
              const otp = msg91.createOTP("919790574449");
              otp.send();
            }} > send otp</Button> */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email address' }]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter password' }]}
            >
              <Input.Password prefix={<LockOutlined rev={undefined} />} placeholder="Password" />
            </Form.Item>

            {/* <Form.Item
              name="number"
              rules={[{ required: true, message: 'Please input your Phone Number!' }]}
            >
              <Input addonBefore="+91" placeholder="Mobile Number" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[{ required: true, message: 'Please enter OTP!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="OTP" />
            </Form.Item> */}

            {/* <OTPVerification 
              onVisible={true}
              onCompletion={(data)=>{
              console.log("OTP result: "+data) // get your response of success/failure.
              // setModalVisible(false)
              }} 
              authToken={'398561TaGkFMi4gR6484cf12P1'}
              widgetId={'33666a704d56303633323433'} /> */}
            <Form.Item>
            <div style={{display:"flex"}}>
              <Button key="back" type={"link"} onClick={()=>{setIsRegisterPopup(true);}}>
                Create my free account
              </Button>
              <Button  htmlType="submit" key="submit" type="primary" //onClick={()=>{props.closePanel();props.setLoginStatus(true);}}
              >
                Login
              </Button>
            </div>
            </Form.Item>
              
          </Form>
          :<></>}
        <a href="/memberLogin"> Click here to redirect to member login</a>
        </div>
      </>}

    </>
  )
}

export default App;
