import React from 'react';
import classes from './Name.module.css';

const name = (props) => {
    var url = `https://www.google.com/maps/dir/${props.currentLat},${props.currentLng}/${props.data.latitude},${props.data.longitude}`;
    
    return(
        <div className={classes.NameWrapper}>
            站名：{props.data.name}
            <a href={url} target="_blank">
                (Google Map)
            </a>
            
        </div>
    );
}

export default name;