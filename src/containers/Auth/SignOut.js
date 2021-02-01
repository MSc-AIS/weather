import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

import { logout } from '../../store/actions/auth';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 1/2/2021.
 */

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    });

    return <Redirect to="/" />;
};

export default Logout;