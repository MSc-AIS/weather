import { Fragment } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 29/01/21.
 */

const LoadingProgress = () => (
    <Fragment>
        <div>
            <LinearProgress />
            <LinearProgress color="primary" />
        </div>
    </Fragment>
);

export default LoadingProgress;