import { useSelector } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const NavigationItems = props => {
    const isAuth = useSelector(state => state.auth.token !== null);

    return (
        isAuth ?
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Αρχική</NavigationItem>
                <NavigationItem link="/collection" exact>Συλλογές</NavigationItem>
                <NavigationItem link="/search" exact>Αναζήτηση</NavigationItem>
                <NavigationItem link="/auth/sign-out" exact>Έξοδος</NavigationItem>
            </ul> :
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Αρχική</NavigationItem>
                <NavigationItem link="/search" exact>Αναζήτηση</NavigationItem>
                <NavigationItem link="/auth/sign-in" exact>Είσοδος</NavigationItem>
            </ul>
    );
};

export default NavigationItems;