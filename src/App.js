import { ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import { theme } from './shared/theme';

import Layout from './hoc/Layout/Layout';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
            <Layout>

            </Layout>
        </div>
    </ThemeProvider>
  );
}

export default App;
