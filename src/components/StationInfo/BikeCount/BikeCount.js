import React from 'react';
import classes from './BikeCount.module.css';

const bikeCount = (props) => {
    return(
        <div className={classes.BikeCountWrapper}>
            剩餘車數：{props.data}
        </div>
    );
}

export default bikeCount;