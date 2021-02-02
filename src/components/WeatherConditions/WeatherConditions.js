import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { mapIconsToDescription, mapIconsToWindDirection } from '../../shared/utility';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { WiCloudDown, WiHumidity, WiCelsius,
    WiFahrenheit, WiStrongWind, WiRaindrop } from 'weather-icons-react';
import CardActions from "@material-ui/core/CardActions";
import SaveIcon from '@material-ui/icons/Save';
/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const useStyles = makeStyles(() => ({
    cardHeader: {
        backgroundColor: '#116149',
        color: 'white'
    },
    weatherContainer: {
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    per: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        marginBottom: '2rem'
    },
    hrStyle: {
        width: '98%'
    },
    saveButton: {
        justifyContent: 'center'
    }
}));

const WeatherConditions = props => {
    const classes = useStyles();

    const date = new Date(props.display.timestamp * 1000).toDateString();

    const today = new Date().toLocaleDateString();

    const [temperature, setTemperature] = useState({
        points: props.display.temperatureConditions.temperature ?
            props.display.temperatureConditions.temperature: 1,
        feelsLike: props.display.temperatureConditions.feelsLike ?
            props.display.temperatureConditions.feelsLike: 1,
        min: props.display.temperatureConditions.minTemperature,
        max: props.display.temperatureConditions.maxTemperature,
        measurement: 'celsius'
    });

    const handleMeasurementToggle = () => {
        setTemperature(temperature.measurement === 'celsius' ? {
            points: temperature.points * 1.8 + 32,
            feelsLike: temperature.feelsLike * 1.8 + 32,
            min: temperature.min * 1.8 + 32,
            max: temperature.max * 1.8 + 32,
            measurement: 'fahrenheit'
        } : {
            points: (temperature.points - 32) / 1.8,
            feelsLike: (temperature.feelsLike - 32) / 1.8,
            min: (temperature.min - 32) / 1.8,
            max: (temperature.max - 32) / 1.8,
            measurement: 'celsius'
        });
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                title={props.city.name}
                subheader={`(${props.city.coordinates[0]}, ${props.city.coordinates[1]})`}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center', color: 'initial' }}
                action={<WbSunnyIcon fontSize="large" />}
                className={classes.cardHeader} />
            <CardContent>
                <Grid container alignItems="center" justify="center" alignContent="center">
                    <Grid item xs={4} className={classes.weatherContainer}>
                        <Grid item>
                            <Button
                                startIcon={<CachedIcon />}
                                size="small"
                                color="secondary"
                                onClick={handleMeasurementToggle}>
                                {`${temperature.measurement === 'celsius' ? 'fahrenheit' : 'celsius'}`}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography component="div" variant="body1" className={classes.per}>
                                <WiCloudDown size={24} style={{paddingRight: 6}} />
                                {`${props.display.weatherConditions.cloudPercentage} %`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="div" variant="body1" className={classes.per}>
                                <WiHumidity size={24} style={{paddingRight: 4}} />
                                {`${props.display.weatherConditions.humidityPercentage} %`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="div" variant="body1" className={classes.per} color="primary">
                                {date.slice(0, 10)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} className={classes.weatherContainer}>
                        <Grid item>
                            {mapIconsToDescription(props.display.weatherConditions.description, 96)}
                        </Grid>
                        <Grid item>
                            <Typography component="div" variant="h5" className={classes.per} color="textSecondary">
                                {props.display.weatherConditions.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} className={classes.weatherContainer}>
                        { props.weatherId === today ?
                            <Fragment>
                                <Grid item>
                                    <Typography component="div" variant="h5" className={classes.per} color="primary">
                                        {Number.parseInt(temperature.points)}
                                        {temperature.measurement === 'celsius' ? <WiCelsius size={48} /> : <WiFahrenheit size={48} />}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component="div" variant="body2" className={classes.per}>
                                        {`Αίσθηση: ${Number.parseInt(temperature.feelsLike)}`}
                                        {temperature.measurement === 'celsius' ? <WiCelsius size={22} /> : <WiFahrenheit size={22} />}
                                    </Typography>
                                </Grid>
                            </Fragment> :
                            <Grid item>
                                {props.display.weatherConditions.rainProbability ?
                                    <Typography component="div" variant="body2" className={classes.per}>
                                        <WiRaindrop size={36}/>
                                        {`${props.display.weatherConditions.rainProbability} %`}
                                    </Typography> : null
                                }

                            </Grid>
                        }
                        <Grid item>
                            <Typography component="div" variant="body1" className={classes.per} color="textSecondary">
                                {`${Number.parseInt(temperature.min)} / ${Number.parseInt(temperature.max)}`}
                                {temperature.measurement === 'celsius' ? <WiCelsius size={36} /> : <WiFahrenheit size={36} />}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="div" variant="body2" className={classes.per}>
                                <WiStrongWind size={30} style={{paddingRight: 12}} />
                                {`${props.display.windConditions.windSpeed} km/h`}
                                {mapIconsToWindDirection(props.display.windConditions.windDirection)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            { props.weatherId === today ?
                <Fragment>
                    <hr className={classes.hrStyle} />
                    <CardContent>
                        <TableContainer>
                            <Table size="small">
                                <TableBody>
                                    <TableRow>
                                        {props.hours.map((hour, index) => (
                                            <TableCell key={index} align="center">
                                                {`${new Date(hour.timestamp * 1000).getHours()}:00`}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        {props.hours.map((hour, index) => (
                                            <TableCell key={index} align="center">
                                                {mapIconsToDescription(hour.weatherConditions.description, 24)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        {props.hours.map((hour, index) => (
                                            <TableCell key={index} align="center">
                                                {Number.parseInt(hour.temperatureConditions.temperature)}
                                                <WiCelsius size={10} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Fragment> : null }
            <hr className={classes.hrStyle} />
            <CardContent>
                <TableContainer>
                    <Table size="medium">
                        <TableBody>
                            {props.forecast.map(day => {
                                return (
                                    <TableRow
                                        key={day.id}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => props.clicked(day)}>
                                        <TableCell align="left" colSpan={1}>
                                            {new Date(day.timestamp * 1000).toDateString()}
                                        </TableCell>
                                        <TableCell align="center" colSpan={6}>
                                            {mapIconsToDescription(day.dailyWeatherConditions.description, 28)}
                                        </TableCell>
                                        <TableCell align="center" colSpan={4} style={{ color: '#798186' }}>
                                            {`${Number.parseInt(day.dailyTemperatureConditions.minTemperature)} / ${Number.parseInt(day.dailyTemperatureConditions.maxTemperature)}`}
                                            <WiCelsius size={18} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {props.showInsert ?
                <Fragment>
                    <hr className={classes.hrStyle} />
                    <CardActions className={classes.saveButton}>
                        <Button
                            startIcon={<SaveIcon />}
                            size="large"
                            color="secondary"
                            onClick={props.insertClicked}>
                            ΑΠΟΘΗΚΕΥΣΗ
                        </Button>
                    </CardActions>
                </Fragment> : null
            }
        </Card>
    );
};

export default WeatherConditions;