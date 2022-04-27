import React from 'react';
import classes from './BikeCount.module.css';
import {BsBicycle} from "react-icons/bs";
import {MdLocalParking} from "react-icons/md";

const bikeCount = (props) => {
    return(
        <div className={classes.BikeCountWrapper}>
            <BsBicycle className={classes.icon}/>{props.sbi}  <MdLocalParking className={classes.icon} />{props.bemp}
        </div>
    );
}

export default bikeCount;