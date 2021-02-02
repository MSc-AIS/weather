import { Fragment, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentToDisplayingConditions, setForecastToDisplayingConditions } from '../../store/actions';
import Cockpit from '../../components/UI/Cockpit/Cockpit';
import WeatherConditions from '../../components/WeatherConditions/WeatherConditions';
import * as actions from '../../store/actions';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const CurrentPosition = () => {
    const dispatch = useDispatch();

    const today = new Date().toLocaleDateString();

    //  selectors
    const { city, loading, forecastConditions, conditionsFetched, conditionsError,
        displayingConditions, cityError } = useSelector(state => state.current);

    //  actions dispatch
    const onInitCity = useCallback(() => {
        dispatch(actions.fetchCity());
    }, [dispatch]);

    const onInitWeatherConditions  = useCallback((city) => {
        dispatch(actions.fetchConditions(city));
    }, [dispatch]);


    useEffect(() => {
       //   get city from IP for new sessions
       if (!city) {
           //   get city from public API action
           onInitCity();
           //   the api may return null as success response. Checking for city again
       } else if (!conditionsFetched && city) {
           //   get weather condition from backend action
           onInitWeatherConditions(city.name);
       }
    }, [city, onInitCity, onInitWeatherConditions, conditionsFetched]);


    const handleDisplayingConditions = day => {
        if (day.id !== displayingConditions.id) {
            day.id !== today ?
                dispatch(setForecastToDisplayingConditions(day)) :
                dispatch(setCurrentToDisplayingConditions());
        }
    };

    const cityErrorMsg = cityError || !city ?
        cityError ?
            <Typography variant="h5" color="error">
                <ErrorOutlineIcon style={{ fontSize: 22, paddingRight: 12 }}/>
                Δεν είναι δυνατή η λήψη της τρέχουσας τοποθεσίας. Προσπαθήστε αργότερα
            </Typography> : <LoadingProgress /> :
            null;

    const wConditions = conditionsFetched ?
        <WeatherConditions
            city={city}
            weatherId={displayingConditions.id}
            forecast={forecastConditions}
            hours={displayingConditions.hourly}
            display={displayingConditions.displaying}
            clicked={handleDisplayingConditions} /> :
        conditionsError ?
            <Typography variant="h5" color="error">
                <ErrorOutlineIcon style={{ fontSize: 22, paddingRight: 12 }}/>
                Έχετε υπερβεί το πλήθος των επιτρεπόμενων κλήσεων στοιχείων καιρού. Προσπαθήστε αργότερα
            </Typography> :
            loading ? <LoadingProgress /> : null;

    return (
        <Fragment>
            <Cockpit title="Αρχική" />
            {cityErrorMsg}
            {wConditions}
        </Fragment>
    );
};

export default CurrentPosition;