import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './App.css';
import { theme } from './shared/theme';
import {Typography} from "@material-ui/core";

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
            <Button size="large" color="secondary" variant="contained">
                Test
            </Button>
            <Typography variant="h2">
                Testing
            </Typography>
        </div>
    </ThemeProvider>
  );
}

export default App;
