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
    const city = useSelector(state => state.current.city);
    const cityError = useSelector(state => state.current.cityError);
    const loading = useSelector(state => state.current.loading);
    const weatherConditions = useSelector(state => state.current.displayingConditions);
    const forecastConditions = useSelector(state => state.current.forecastConditions);
    const conditionsFetched = useSelector(state => state.current.conditionsFetched);
    const conditionsError = useSelector(state => state.current.conditionsError);

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
       } else if (!conditionsFetched) {
           //   get weather condition from backend action
           onInitWeatherConditions(city.name);
       }
    }, [city, onInitCity, onInitWeatherConditions, conditionsFetched]);


    const handleDisplayingConditions = day => {
        if (day.id !== weatherConditions.id) {
            day.id !== today ?
                dispatch(setForecastToDisplayingConditions(day)) :
                dispatch(setCurrentToDisplayingConditions());
        }
    };

    const cityErrorMsg = cityError ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon style={{ fontSize: 22, paddingRight: 12 }}/>
            Δεν είναι δυνατή η λήψη της τρέχουσας τοποθεσίας. Προσπαθήστε αργότερα
        </Typography> : null;

    const wConditions = conditionsFetched ?
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