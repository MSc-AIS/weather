import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import { theme } from './shared/theme';

import Layout from './hoc/Layout/Layout';
import CurrentPosition from './containers/CurrentPosition/CurrentPosition';
import SearchCities from './containers/SearchCities/SearchCities';
import Collections from './containers/Collections/Collections';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
            <Layout>
                <Switch>
                    <Route path="/collection" exact component={Collections} />
                    <Route path="/search" exact component={SearchCities} />
                    <Route path="/" exact component={CurrentPosition} />
                </Switch>
            </Layout>
        </div>
    </ThemeProvider>
  );
}

export default App;
