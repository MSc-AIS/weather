import { Fragment } from 'react';

import Cockpit from '../../components/UI/Cockpit/Cockpit';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const CurrentPosition = () => {
    return (
        <Fragment>
            <Cockpit title="Αρχική" />
            <div>Current Position Page</div>
        </Fragment>
    );
};

export default CurrentPosition;