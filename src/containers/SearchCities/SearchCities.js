import { Fragment } from 'react';

import Cockpit from '../../components/UI/Cockpit/Cockpit';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 29/01/21.
 */

const SearchCities = () => {
    return (
        <Fragment>
            <Cockpit title="Αναζήτηση Πόλεων" />
            <div>Search Cities Page</div>
        </Fragment>
    );
};

export default SearchCities;