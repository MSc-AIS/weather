import { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Cockpit from '../UI/Cockpit/Cockpit';
import { fetchInputCityConditions, setCurrentToDisplay, setForecastToDisplay } from '../../store/actions';
import LoadingProgress from '../UI/LoadingProgress/LoadingProgress';
import WeatherConditions from '../WeatherConditions/WeatherConditions';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 2/2/21.
 */

const CityConditions = () => {
    const dispatch = useDispatch();
    const { cityName } = useParams();

    const today = new Date().toLocaleDateString();

    //  selectors
    const { city, loading, forecastConditions, conditionsFetched, conditionsError,
        displayingConditions } = useSelector(state => state.search);

    const onInputCityConditions =useCallback(() => {
        dispatch(fetchInputCityConditions(cityName));
    }, [cityName, dispatch]);

    useEffect(() => {
        onInputCityConditions();
    }, [onInputCityConditions]);

    const handleDisplayingConditions = day => {
        if (day.id !== displayingConditions.id) {
            day.id !== today ?
                dispatch(setForecastToDisplay(day)) :
                dispatch(setCurrentToDisplay());
        }
    };

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
            <Cockpit title="Συνθήκες Πόλης" />
            {wConditions}
        </Fragment>
    );
};

export default CityConditions;