import React, { useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { authSignUp } from '../../store/actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LoadingProgress from '../../components/UI/LoadingProgress/LoadingProgress';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 31/1/2021.
 */


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2)
    },
    link: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    }
}));

const SignUp = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuth = useSelector(state => state.auth.token);

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false
    });

    const handleChange = property => event => {
        setValues({ ...values, [property]: event.target.value });
    };

    const handleSignUp = useCallback((event) => {
        event.preventDefault();
        dispatch(authSignUp(values.firstName, values.lastName, values.email, values.password));
    }, [dispatch, values.firstName, values.lastName, values.email, values.password]);

    const errorMsg = error ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon style={{ fontSize: 22, paddingRight: 12 }}/>
            Δεν είναι η εγγραφή σας. Ελέγξτε τα στοιχεία εγγραφής
        </Typography> : null;

    const authRedirect = isAuth ?
        <Redirect to="/"/> : null;

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon htmlColor="#fff"/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Εγγραφή
                </Typography>
                {authRedirect}
                {errorMsg}
                {loading ?
                    <LoadingProgress /> :
                    <form className={classes.form} onSubmit={handleSignUp}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Όνομα"
                                    name="firstName"
                                    placeholder="Συμπληρώστε Όνομα"
                                    autoComplete="fname"
                                    autoFocus
                                    onChange={handleChange('firstName')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Επώνυμο"
                                    name="lastName"
                                    placeholder="Συμπληρώστε Επώνυμο"
                                    autoComplete="lname"
                                    onChange={handleChange('lastName')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label="Διεύθυνση Email"
                                    name="email"
                                    placeholder="Συμπληρώστε το Email"
                                    autoComplete="email"
                                    onChange={handleChange('email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Κωδικός"
                                    type="password"
                                    placeholder="Συμπληρώστε τον Κωδικό"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChange('password')}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            ΕΓΓΡΑΦΗ
                        </Button>
                        <Grid container>
                            <Link component={RouterLink} to="/auth/sign-in" variant="body1" className={classes.link}>
                                {"Έχετε ήδη λογαριασμό; Σύνδεση"}
                            </Link>
                        </Grid>
                    </form>
                }
            </div>
        </Container>
    );
}

export default SignUp;