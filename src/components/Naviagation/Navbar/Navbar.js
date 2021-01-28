import React from 'react';

import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import {Hidden, makeStyles, AppBar } from '@material-ui/core';
import { Toolbar, IconButton, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

//  styling
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        // textAlign: 'center'
    },
    toolbar: {
        color: 'white'
    },
    img: {
        height: 80,
        textAlign: 'center'
    },
}));


const Navbar = props => {
    const classes = useStyles();

    return (
        <AppBar position="sticky">
            <Toolbar className={classes.toolbar}>
                 <Grid container spacing={2} justify="space-between" alignItems="center">
                    <Hidden mdUp>
                        <Grid item xs={1}>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={props.toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Hidden>
                    <Hidden smDown>
                        <Grid item md={3} lg={4}>
                            <Typography variant="h5" component="h2" className={classes.title}>
                                AIS Weather
                            </Typography>
                        </Grid>
                    </Hidden>
                    <Grid item xs={11} md={3} lg={4}>
                        <Typography component="div" className={classes.img}>
                            <Logo logoType="appLogo" />
                        </Typography>
                    </Grid>
                    <Hidden smDown>
                        <Grid item md={6} lg={4}>
                            <Typography component="div">
                                <NavigationItems />
                            </Typography>
                        </Grid>
                    </Hidden>
                 </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;