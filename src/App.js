import { useEffect, useCallback, lazy, Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authCheckState } from './store/actions';
import './App.css';
import { theme } from './shared/theme';
import Layout from './hoc/Layout/Layout';
import LoadingProgress from './components/UI/LoadingProgress/LoadingProgress';
import CurrentPosition from './containers/CurrentPosition/CurrentPosition';
import Logout from './containers/Auth/SignOut';

//  Views lazy loading added. Stavros Labrinos [stalab at linuxmail.org] on 2/2/21.
const SearchCities = lazy(() => import(`./containers/SearchCities/SearchCities`));
const Collections = lazy(() => import(`./containers/Collections/Collections`));
const CityConditions = lazy(() => import(`./components/CityConditions/CityConditions`));
const SignIn = lazy(() => import(`./containers/Auth/SignIn`));
const SignUp = lazy(() => import(`./containers/Auth/SignUp`));

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
            <Route path="/collection" render={props => <Collections {...props} />} />
            <Route path="/collection/:cityName" render={props => <CityConditions {...props} />} />
            <Route path="/search" render={props => <SearchCities {...props} />} />
            <Route path="/auth/sign-out" exact component={Logout} />
            <Route path="/" exact component={CurrentPosition} />
            <Redirect to="/" />
        </Switch> :
        <Switch>
            <Route path="/search" render={props => <SearchCities {...props} />} />
            <Route path="/auth/sign-in" render={props => <SignIn {...props} />} />
            <Route path="/auth/sign-up" render={props => <SignUp {...props} />} />
            <Route path="/" exact component={CurrentPosition} />
            <Redirect to="/" />
        </Switch>;

    return (
    <ThemeProvider theme={theme}>
        <div className="App">
            <Layout>
                <Suspense fallback={<LoadingProgress />}>{authRouting}</Suspense>
            </Layout>
        </div>
    </ThemeProvider>
  );
}

export default withRouter(App);
