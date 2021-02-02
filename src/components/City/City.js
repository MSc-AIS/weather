import React from 'react';
import { CardActionArea, IconButton, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        backgroundColor: '#116149',
        color: 'white'
    },
    deleteButton: {
        justifyContent: 'center'
    }
}));

const City = props => {
    const classes = useStyles();

    const { id, cityGeoPoint, country } = props;

    return (
        <Card>
            <CardHeader
                title={cityGeoPoint.cityName}
                titleTypographyProps={{ align: 'center' }}
                action={<LocationCityIcon fontSize="large" />}
                className={classes.cardHeader} />
            <CardActionArea onClick={() => props.showDetails(cityGeoPoint.cityName)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h4" align="center">
                        {country}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p" align="center">
                        {`(${cityGeoPoint.coordinates[0]}, ${cityGeoPoint.coordinates[1]})`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <hr style={ {color: '#2e35c5', width: '90%'} }/>
            <CardActions className={classes.deleteButton}>
                <IconButton aria-label="delete" onClick={() => props.deleteCity(id)}>
                    <DeleteIcon fontSize="large" color="error"/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default City;