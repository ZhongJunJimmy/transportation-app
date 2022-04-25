import React from 'react';
import classes from './TotalCount.module.css';

const totalCount = (props) => {
    return(
        <div className={classes.TotalCountWrapper}>
            總車位數：{props.data}
        </div>
    );
}

export default totalCount;