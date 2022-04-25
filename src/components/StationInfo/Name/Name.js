import React from 'react';
import classes from './Name.module.css';

const name = (props) => {
    return(
        <div className={classes.NameWrapper}>
            站名：{props.data} 
        </div>
    );
}

export default name;