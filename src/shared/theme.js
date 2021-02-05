import { createMuiTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

/**
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500]
        },
        secondary: {
            light: '#a68eff',
            main: '#6e60f9',
            dark: '#2e35c5',
            contrastText: '#ede7f6',

        }
    }
});