import React from 'react';
import classes from './Name.module.css';
import {IoNavigateCircleOutline} from "react-icons/io5";

const name = (props) => {
    var url = `https://www.google.com/maps/dir/${props.currentLat},${props.currentLng}/${props.data.latitude},${props.data.longitude}`;
    
    return(
        <div className={classes.NameWrapper}>
            {props.data.name}&nbsp;
            <a href={url} target="_blank">
                <IoNavigateCircleOutline />
            </a>
            
        </div>
    );
}

export default name;