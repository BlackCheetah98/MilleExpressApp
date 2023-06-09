import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import WebsiteBuilder from './components/WebsiteBuilder/WebsiteBuilder';

import {
  Switch,
  StyleSheet,
  Alert,
  Text,
  View,
  TextInput,
  Button
} from "react-native-web" ;

function App() {
  function sendRequest()  {
    axios.post('/user', {
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
  return (
    <div className="App">
      <button onClick={sendRequest}> Send Request</button>
      <header className="App-header">

      </header>
      <WebsiteBuilder editMode={true} siteStore={""} />
    </div>
  );
}

export default App;
