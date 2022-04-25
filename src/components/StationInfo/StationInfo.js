import React from 'react';
import classes from './StationInfo.module.css';

import Date from './Date/Date';
import Distance from './Distance/Distance'
import Name from './Name/Name'
import TotalCount from './TotalCount/TotalCount'
import BikeCount from './BikeCount/BikeCount'



const stationInfo = (props) => {
    return(
        <div className={classes.StationInfoWrapper}>
            <div className={classes.StationDataWrapper}>
                <Name data={props.data.name}/>
                <Distance data={props.data.distance}/>
                <TotalCount data={props.data.totalCNT}/>
                <BikeCount data={props.data.bikeCNT}/>
                <Date data={props.data.date}/>
            </div>
        </div>
    );
}

export default stationInfo;