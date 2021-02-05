import React, { Fragment, useState, memo } from 'react';

import Navbar from '../../components/Naviagation/Navbar/Navbar';
import SideDrawer from '../../components/Naviagation/SideDrawer/SideDrawer';
import Modal from '../../components/UI/Modal/Modal';
import PrivacyPolicy from '../../components/Naviagation/Footer/FooterContent/PrivacyPolicy';
import Footer from '../../components/Naviagation/Footer/Footer';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const useStyles = makeStyles(theme => ({
    mainStyled: {
        [theme.breakpoints.up("md")]: {
            marginTop: '3rem',
        }
    }
}))

const Layout = props => {
    const classes = useStyles();

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const handleSideDrawerClose = () => {
        setSideDrawerIsVisible(false);
    };

    const handleSideDrawerToggle = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    const [privacyVisible, setPrivacyVisible] = useState(false);

    const handlePrivacyClose = () => {
        setPrivacyVisible(false);
    };

    const handlePrivacyOpen = () => {
        setPrivacyVisible(true);
    };

    return (
        <Fragment>
            <Modal show={privacyVisible} closeModal={handlePrivacyClose}>
                <PrivacyPolicy />
            </Modal>
            <Navbar toggleDrawer={handleSideDrawerToggle} />
            <SideDrawer open={sideDrawerIsVisible} closed={handleSideDrawerClose} />
            <main className={classes.mainStyled}>
                <Container maxWidth="lg">
                    {props.children}
                </Container>
            </main>
            <Footer showPrivacy={handlePrivacyOpen} />
        </Fragment>
    );
};

export default memo(Layout);

