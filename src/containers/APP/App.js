import React, { Component } from 'react';

import classes from './App.module.css';
import assetMapping from '../../assets/assetMapping.json';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      geolocationState: false,
      location:{}
    }
  }
  
  getLocation = () => {
    this.state.geolocationState=true;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.setState({
          geolocationState: true,
          location:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        console.log(`{${this.state.location.latitude}, ${this.state.location.longitude}}`);
      });
    }
  }
  
  render() {
    return (
      
      <div className={classes.AppWrapper}>
        <Header 
        color={assetMapping._colorDesc[(this.state.geolocationState)? "green":"gray"]}
        onClickHandler={this.getLocation} />

        <Footer />
      </div>
    );
  }
}

export default App;