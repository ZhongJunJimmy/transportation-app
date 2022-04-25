import React from 'react';
import classes from './Date.module.css';

const date = (props) => {
    const today = new Date();
    return(
        <div className={classes.DateWrapper}>
            更新日期：{props.data} 
        </div>
    );
}

export default date;