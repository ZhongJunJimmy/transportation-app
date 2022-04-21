import React from 'react'

import classes from './Logo.module.css';

const logo = (props) => {
    let logoWithColorScheme = [
        classes.Logo,
        (props.colorScheme === 'dark') ? classes.Dark : classes.Light
    ];
    return(
        <h1 className={logoWithColorScheme.join(' ')} onClick={props.clicked}>
            My Transportation App
        </h1>
    );
}

export default logo;