import {Fragment, useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    fetchCitiesCollection,
    fetchInputCityConditions,
    setCurrentToDisplay,
    setForecastToDisplay,
    addCity
} from '../../store/actions';
import { capitalizeStr, arrayEquals } from '../../shared/utility';
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
    const { city, loading, forecastConditions, conditionsFetched, conditionsError,
        displayingConditions } = useSelector(state => state.search);
    const token = useSelector(state => state.auth.token);
    const collection = useSelector(state => state.collection.collection);

    const [cityName, setCityName] = useState('');

    const onInputCityConditions =useCallback(event => {
        event.preventDefault();
        dispatch(fetchInputCityConditions(capitalizeStr(cityName.trim())));
    }, [cityName, dispatch]);

    const handleDisplayingConditions = day => {
        if (day.id !== displayingConditions.id) {
            day.id !== today ?
                dispatch(setForecastToDisplay(day)) :
                dispatch(setCurrentToDisplay());
        }
    };

    //  dispatching action to fetch user cities collection
    const onFetchCitiesCollection = useCallback(() => {
        dispatch(fetchCitiesCollection(token));
    }, [dispatch, token]);

    //  componentDidMount
    useEffect(() => {
        if (token && collection.length === 0) {
            onFetchCitiesCollection();
        }
    }, [onFetchCitiesCollection, token, collection.length]);

    // insert if the user doesn't have this city in the collection and is authorized
    const showInsertBtn = () => {
        return collection
            .filter(c => arrayEquals(c.cityGeoPoint.coordinates, city.coordinates)).length === 0 && token;
    };

    const onAddCity = useCallback(() => {
        if (city) {
            dispatch(addCity(city.id, token));
        }
    }, [dispatch, city, token]);

    const displayLoading = loading ?
        <LoadingProgress /> : null;

    const wConditions = conditionsFetched && (displayingConditions !== null) ?
        <WeatherConditions
            city={city}
            weatherId={displayingConditions.id}
            forecast={forecastConditions}
            hours={displayingConditions.hourly}
            showInsert={showInsertBtn()}
            insertClicked={onAddCity}
            display={displayingConditions.displaying}
            clicked={handleDisplayingConditions} /> :
        conditionsError ?
            <Typography variant="h5" color="textPrimary">
                <ErrorOutlineIcon style={{ fontSize: 22, paddingRight: 12 }}/>
                {`Δεν βρέθηκαν δεδομένα για την πόλη ${cityName}. Ελέγξτε τα φίλτρα αναζήτησης`}
            </Typography> :
            conditionsFetched ?
            <Typography variant="h5" color="error">
                <ErrorOutlineIcon style={{ fontSize: 22, paddingRight: 12 }}/>
                Έχετε υπερβεί το πλήθος των επιτρεπόμενων κλήσεων στοιχείων καιρού. Προσπαθήστε αργότερα
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