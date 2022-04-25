import React from 'react';
import classes from './Distance.module.css';

const distance = (props) => {
    return(
        <div className={classes.DistanceWrapper}>
            距離：{(props.data > 1000)?`${props.data/1000}km`:`${props.data}m`}
        </div>
    );
}

export default distance;