import React, { Component, setState } from 'react';


import classes from './App.module.css';
import assetMapping from '../../assets/assetMapping.json';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../elements/Button/Button';
import CardList from '../../elements/CardList/CardList';

var latitude = "";
var longitude = "";
var getLocationIntervalTime = 60;
var processLive = "";
var stationInfo = [];


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
        
      ]
    };
  }

  distance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

  
  getStation = () =>{
    stationInfo = [];
    const URL = 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for(let i = 1;i <=405; i++){
              let itemIdx = i.toString().padStart(4, '0');
              if(data.retVal[itemIdx] != undefined){

                let dist = this.distance(this.state.location.latitude, this.state.location.longitude, data.retVal[itemIdx].lat, data.retVal[itemIdx].lng, "K");


                stationInfo.push({
                  key: i,
                  date: data.retVal[itemIdx].mday,
                  name: data.retVal[itemIdx].sna,
                  distance: dist,
                  totalCNT: data.retVal[itemIdx].tot,
                  bikeCNT: data.retVal[itemIdx].sbi,
                  latitude: data.retVal[itemIdx].lat,
                  longitude: data.retVal[itemIdx].lng,
                  district: data.retVal[itemIdx].sarea
                })

                

              }
            }
          //console.log(`data: ${JSON.stringify(stationInfo, undefined, 4)}`);
          //console.log(stationInfo.length);
          // If city exists, update weather details
        })
        .catch(err => {
          console.log(`err: ${err}`);
        });
  }
  
  getLocation = () => {
    //console.log(new Date().toLocaleTimeString());
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
      if(stationInfo.length > 0){
        for(let j = 0; j < stationInfo.length; j++){
          for(let k = j+1; k < stationInfo.length; k++){
            if(stationInfo[k].distance < stationInfo[j].distance){
              let temp = stationInfo[j];
              stationInfo[j] = stationInfo[k];
              stationInfo[k] = temp;
            }
          }
        }
  
        var nearStation = [];
        if(stationInfo[0].distance){
          for(let j = 0; j < 3; j++){
            nearStation[j] = stationInfo[j]
          }
        }
        
        
        this.setState({
          stationsInfo:nearStation
        });
      }
      
      //console.log(`${this.state.location.latitude},${this.state.location.longitude}`)
      //this.getStation();
    }
  }

  
  getLocationInfoAndStationInfo = (offset) =>{
    this.getLocation();
    if(this.state.geolocationState && this.state.stationsInfo.length == 0){
      this.getStation();
    }
    offset = offset - 1;
    //console.log(offset);
    if(offset <= 0){
      offset = getLocationIntervalTime;
      if(this.state.geolocationState){
        this.getStation();
      }
    }

    processLive = setTimeout(this.getLocationInfoAndStationInfo, 1000, offset);
  }





  render() {
    {
      //console.log(this.state.geolocationState);
      (this.state.geolocationState)?console.log(`geolocationState: ${this.state.geolocationState}`):this.getLocationInfoAndStationInfo(getLocationIntervalTime)
      
    }
    
    return (
      <div className={classes.AppWrapper}>
        <Header 
        color={assetMapping._colorDesc[(this.state.geolocationState)? "green":"gray"]} />
        <CardList data={this.state}></CardList>
        <Footer />
      </div>
    );
  }
}

export default App;