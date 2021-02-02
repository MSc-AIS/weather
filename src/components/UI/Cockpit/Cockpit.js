import Typography from '@material-ui/core/Typography';
import classes from './Cockpit.module.css';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const cockpit = props => {

    return (
        <Typography className={classes.Title}
                    variant="h4"
                    component="h2"
                    style={{ marginBottom: '2rem' }}
                    color="textPrimary">
            {props.title}
        </Typography>
    );
}

export default cockpit;