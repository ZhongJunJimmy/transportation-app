import React, { Component, setState } from 'react';


import classes from './App.module.css';
import assetMapping from '../../assets/assetMapping.json';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../elements/Button/Button';
import CardList from '../../elements/CardList/CardList';

var latitude = "";
var longitude = "";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  //console.log(`Location: ${crd.latitude}, ${crd.longitude}`);

  latitude = crd.latitude;
  longitude = crd.longitude;
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      geolocationState: false,
      location:{},
      stationsInfo:[
        {
          key:0,
          date: "2022-04-24 23:36:00",
          name: "測試站",
          distance: 1230,
          totalCNT: 10,
          bikeCNT: 2
        },
        {
          key:1,
          date: "2022-04-24 23:36:00",
          name: "測試站",
          distance: 1230,
          totalCNT: 10,
          bikeCNT: 2
        },
        {
          key:2,
          date: "2022-04-24 23:36:00",
          name: "測試站",
          distance: 1230,
          totalCNT: 10,
          bikeCNT: 2
        }
      ]
    };
  }
  
  
  
  getLocation = () => {
    this.state.geolocationState=true;
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      }, () => {console.log("Get location info fail...");}, options);
      //console.log(`${latitude}, ${longitude}`);
    }

    if(latitude !== "" && longitude !== ""){
      this.setState({
        geolocationState: true,
        location:{
          latitude: latitude,
          longitude: longitude
        }
      });
    }
  }

  getStation = () =>{
    const URL = 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json';
    fetch(URL)
    .then(function(response) {
      console.log(`${JSON.stringify(response)}`);
    })
    .then(function(myJson) {
      console.log(myJson);
    });
  }



  render() {
    return (
      <div className={classes.AppWrapper}>
        <Header 
        color={assetMapping._colorDesc[(this.state.geolocationState)? "green":"gray"]} />

        <Button name="getLocation" clicked={this.getLocation}>GPS</Button>
        <Button name="getStation" clicked={this.getStation}>STATIONS</Button>
        <CardList data={this.state.stationsInfo} />
        {console.log(`${this.state.location.latitude}, ${this.state.location.longitude}`)}

        <Footer />
      </div>
    );
  }
}

export default App;