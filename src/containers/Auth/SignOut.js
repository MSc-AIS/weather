import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { logout } from '../../store/actions/auth';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 1/2/2021.
 */

const Logout = () => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);

    //  async action dispatching in order to post logout to the backend
    const onUserLogout = useCallback(() => {
        dispatch(logout(token));
    }, [dispatch, token]);

    useEffect(() => {
        onUserLogout();
    });

    return <Redirect to="/" />;
};

export default Logout;