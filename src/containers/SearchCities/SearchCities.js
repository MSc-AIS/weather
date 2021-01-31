import { Fragment, useState, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { fetchInputCityConditions, setCurrentToDisplay, setForecastToDisplay } from '../../store/actions';
import { capitalizeStr } from '../../shared/utility';
import Cockpit from '../../components/UI/Cockpit/Cockpit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography';
import WeatherConditions from "../../components/WeatherConditions/WeatherConditions";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import LoadingProgress from "../../components/UI/LoadingProgress/LoadingProgress";

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 29/01/21.
 */

const SearchCities = () => {
    const dispatch = useDispatch();

    const today = new Date().toLocaleDateString();

    //  selectors
    const city = useSelector(state => state.search.city);
    const loading = useSelector(state => state.search.loading);
    const weatherConditions = useSelector(state => state.search.displayingConditions);
    const forecastConditions = useSelector(state => state.search.forecastConditions);
    const conditionsFetched = useSelector(state => state.search.conditionsFetched);
    const conditionsError = useSelector(state => state.search.conditionsError);

    const [cityName, setCityName] = useState('');

    const onInputCityConditions =useCallback(event => {
        event.preventDefault();
        dispatch(fetchInputCityConditions(capitalizeStr(cityName.trim())));
    }, [cityName, dispatch]);

    const handleDisplayingConditions = day => {
        if (day.id !== weatherConditions.id) {
            day.id !== today ?
                dispatch(setForecastToDisplay(day)) :
                dispatch(setCurrentToDisplay());
        }
    };

    const displayLoading = loading ?
        <LoadingProgress /> : null;

    const wConditions = conditionsFetched && (weatherConditions !== null) ?
        <WeatherConditions
            city={city}
            weatherId={weatherConditions.id}
            forecast={forecastConditions}
            hours={weatherConditions.hourly}
            display={weatherConditions.displaying}
            clicked={handleDisplayingConditions} /> :
        conditionsError ?
            <Typography variant="h5" color="error">
                <ErrorOutlineIcon style={{ fontSize: 22, paddingRight: 12 }}/>
                Έχετε υπερβεί το πλήθος των επιτρεπόμενων κλήσεων στοιχείων καιρού. Προσπαθήστε αργότερα
            </Typography> :
            conditionsFetched ?
            <Typography variant="h5" color="error">
                <ErrorOutlineIcon style={{ fontSize: 22, paddingRight: 12 }}/>
                {`Δεν βρέθηκαν δεδομένα για την πόλη ${cityName}. Ελέγξτε τα φίλτρα αναζήτησης`}
            </Typography> : null;

    return (
        <Fragment>
            <Cockpit title="Αναζήτηση Πόλεων" />
            <form onSubmit={onInputCityConditions}>
                <Grid container justify="center" spacing={3} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            onChange={evt => setCityName(evt.target.value)}
                            required
                            label="Πόλη"
                            placeholder="Εισάγετε Πόλη"
                            helperText="Λατινικοί Χαρακτήρες"
                            fullWidth
                            value={cityName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            type="submit"
                            fullWidth
                            startIcon={<SearchIcon />}>
                            ΑΝΑΖΗΤΗΣΗ
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {displayLoading}
            {wConditions}
        </Fragment>
    );
};

export default SearchCities;