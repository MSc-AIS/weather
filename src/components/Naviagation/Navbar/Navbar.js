import { Fragment } from 'react';

import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ScrollTop from '../ScrollTop/ScrollTop';
import { Hidden, makeStyles, AppBar, CssBaseline, Fab } from '@material-ui/core';
import { Toolbar, IconButton, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        color: 'white'
    },
    img: {
        height: 80,
        textAlign: 'center',
        flex: 2
    },
    logoStyle: {
        display: 'flex'
    }
}));


const Navbar = props => {
    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="sticky">
                <Toolbar className={classes.toolbar} >
                    <CssBaseline />
                     <Grid container spacing={2} justify="space-between" alignItems="center">
                        <Hidden smDown>
                            <Grid item md={3} lg={4}>
                                <Typography variant="h5" component="h2" className={classes.title}>
                                    AIS Weather
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item xs={11} md={3} lg={4} className={classes.logoStyle}>
                            <Hidden mdUp>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={props.toggleDrawer}>
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
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
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Fragment>
    );
}

export default Navbar;