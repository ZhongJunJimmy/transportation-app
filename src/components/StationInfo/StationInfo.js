import React from 'react';
import classes from './StationInfo.module.css';

import Date from './Date/Date';
import Distance from './Distance/Distance'
import Name from './Name/Name'
import BikeCount from './BikeCount/BikeCount'



const stationInfo = (props) => {
    return(
        <div className={classes.StationInfoWrapper}>
            <div className={classes.StationDistanceWrapper}>
                <Name data={props.data} currentLat={props.curLat} currentLng={props.curLng}/>
                <Distance data={props.data.distance}/>
            </div>
            <div className={classes.StationDataWrapper}>
                
                <BikeCount sbi={props.data.bikeCNT} bemp={props.data.bempCNT}/>
                {/* <Date data={props.data.date}/> */}
            </div>
            
        </div>
    );
}

export default stationInfo;