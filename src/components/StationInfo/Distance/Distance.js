import React from 'react';
import classes from './Distance.module.css';

const distance = (props) => {
    return(
        <div className={classes.DistanceWrapper}>
            {(props.data > 1000)?`${Math.floor(props.data)/1000}km`:`${Math.floor(props.data)}m`}
        </div>
    );
}

export default distance;