import { Link } from 'react-router-dom';

import weatherLogo from '../../../assets/images/4203085.png';
import papeiImg from '../../../assets/images/papeiLogo.png'
import classes from './Logo.module.css';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const logo = props => {
    let preferences = {link: '/'}

    switch (props.logoType) {
        case ('appLogo'):
            preferences.src = weatherLogo;
            preferences.alt = 'Applications Weather logo';
            break;
        case('papeiLogo'):
            preferences.link = 'https://www.ds.unipi.gr/';
            preferences.src = papeiImg;
            preferences.target = '_black';
            preferences.rel = 'noreferrer';
            preferences.alt = 'Logo of University of Piraeus';
            break;
        default:
            break;
    }

    const link = props.logoType === 'papeiLogo' ?
        <a href={preferences.link}
           target={preferences.target}
           rel={preferences.rel}>
            <img src={preferences.src}
                 alt={preferences.alt}
                 height="40%"
                 width="40%" />
        </a> :
        <Link to={preferences.link}>
            <img src={preferences.src}
                 alt={preferences.alt} />
        </Link>

    return (
        <div className={classes.Logo}>
            {link}
        </div>
    );
};

export default logo;