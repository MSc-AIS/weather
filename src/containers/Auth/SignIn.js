import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

export default function SignIn() {
    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false
    });

    const handleChange = property => event => {
        setValues({ ...values, [property]: event.target.value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon htmlColor="#fff"/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Είσοδος
                </Typography>
                <form className={classes.form}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Διεύθυνση Email"
                        name="email"
                        placeholder="Συμπληρώστε το Email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange('email')} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Κωδικός"
                        type={values.showPassword ? 'text': 'password'}
                        placeholder="Συμπληρώστε τον Κωδικό"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange('password')}/>
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        ΣΥΝΔΕΣΗ
                    </Button>
                    <Grid container>
                        <Link component={RouterLink} to="/auth/sign-up" variant="body1" className={classes.link}>
                            {"Δεν έχετε λογαριασμό; Εγγραφή"}
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}