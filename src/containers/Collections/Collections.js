import { Fragment, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import axios from '../../axios-weather';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchCitiesCollection } from '../../store/actions';
import Cockpit from '../../components/UI/Cockpit/Cockpit';
import City from '../../components/City/City';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';
import { Grid, makeStyles} from '@material-ui/core';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 1/02/21.
 */

const useStyles = makeStyles(theme => ({
   root: {
       marginBottom: theme.spacing(2),
       marginTop: theme.spacing(2)
   }
}));

const Collections = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const token = useSelector(state => state.auth.token);
    const loading = useSelector(state => state.collection.loading);
    const collection = useSelector(state => state.collection.collection);

    //  dispatching action to fetch user cities collection
    const onFetchCitiesCollection = useCallback(() => {
        dispatch(fetchCitiesCollection(token));
    }, [dispatch, token]);

    //  componentDidMount
    useEffect(() => {
        if (collection.length === 0) {
            onFetchCitiesCollection();
        }
    }, [onFetchCitiesCollection, collection.length]);

    const handleShowDetails = cityName => {
        console.log('handleDetails');
        history.push(`${history.location.pathname}/${cityName}`);
    };

    const handleDeleteCity = cityId => {
        console.log('deletingCity', cityId, token);
    };

    const cities = loading ?
        <LoadingProgress /> :
        collection.map(city => (
            <Grid item xs={12} sm={6} md={4} key={city.id}>
                <City content={city}
                      showDetails={handleShowDetails}
                      deleteCity={handleDeleteCity} />
            </Grid>
        ));

    return (
        <Fragment>
            <Cockpit title="Συλλογές Πόλεων" />
            <Grid container spacing={2} justify="center" className={classes.root} >
                {cities}
            </Grid>
        </Fragment>
    );
};

export default withErrorHandler(Collections, axios);