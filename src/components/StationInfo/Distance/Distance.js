import React from 'react';
import classes from './Distance.module.css';

const distance = (props) => {
    return(
        <div className={classes.DistanceWrapper}>
            {(props.data > 1)?`${Math.floor(props.data)}km`:`${Math.floor(props.data * 1000)}m`}
        </div>
    );
}

export default distance;