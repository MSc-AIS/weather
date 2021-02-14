import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import classes from './Cockpit.module.css';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const cockpit = props => {

    return (
        //  temp disable cockpit title
        <Hidden mdUp>
            <Typography className={classes.Title}
                        variant="h5"
                        component="h2"
                        style={{ marginBottom: '2rem' }}
                        id="back-to-top-anchor"
                        color="textPrimary">
                {/*{props.title}*/}
            </Typography>
        </Hidden>
    );
}

export default cockpit;