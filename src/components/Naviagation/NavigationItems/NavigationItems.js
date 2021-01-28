import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Αρχική</NavigationItem>
        <NavigationItem link="/collection" exact>Συλλογές</NavigationItem>
        <NavigationItem link="/search" exact>Αναζήτηση</NavigationItem>

        {/*{props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}*/}
        {/*{!props.isAuthenticated*/}
        {/*    ? <NavigationItem link="/auth">Authenticate</NavigationItem>*/}
        {/*    : <NavigationItem link="/logout">Logout</NavigationItem>}*/}
    </ul>
);

export default navigationItems;