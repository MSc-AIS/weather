import { useEffect, useCallback } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authCheckState } from './store/actions';
import './App.css';
import { theme } from './shared/theme';

import Layout from './hoc/Layout/Layout';
import CurrentPosition from './containers/CurrentPosition/CurrentPosition';
import SearchCities from './containers/SearchCities/SearchCities';
import Collections from './containers/Collections/Collections';
import CityConditions from './components/CityConditions/CityConditions';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';
import Logout from './containers/Auth/SignOut';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

function App() {
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.auth.token !== null);

    const onTryAutoSignUp = useCallback(() => {
        dispatch(authCheckState());
    }, [dispatch]);

    useEffect(()=> {
        onTryAutoSignUp();
    }, [onTryAutoSignUp]);

    const authRouting = isAuth ?
        <Switch>
            <Route path="/collection" exact component={Collections} />
            <Route path="/collection/:cityName" exact component={CityConditions} />
            <Route path="/search" exact component={SearchCities} />
            <Route path="/auth/sign-out" exact component={Logout} />
            <Route path="/" exact component={CurrentPosition} />
            <Redirect to="/" />
        </Switch> :
        <Switch>
            <Route path="/search" exact component={SearchCities} />
            <Route path="/auth/sign-in" exact component={SignIn} />
            <Route path="/auth/sign-up" exact component={SignUp} />
            <Route path="/" exact component={CurrentPosition} />
            <Redirect to="/" />
        </Switch>;

    return (
    <ThemeProvider theme={theme}>
        <div className="App">
            <Layout>
                {authRouting}
            </Layout>
        </div>
    </ThemeProvider>
  );
}

export default withRouter(App);
