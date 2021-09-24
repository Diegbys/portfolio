import React from 'react';
import { Paper, Grid, TextField, Button, Typography, IconButton, Backdrop, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Link from 'next/link';

import i18nContext from '../../src/context/i18n';
import Styles from '../../styles/login.module.css';
import ModalAlert from '../../src/components/modalAlert';
import { validateEmail } from '../../src/components/utils';

export default function Login() {
    const router = useRouter();
    const { i18n } = React.useContext(i18nContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialog, setDialog] = React.useState({});

    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [errors, setErrors] = React.useState({});

    const handleData = (event) => {
        setData({ ...data, ...{ [event.target.id]: event.target.value } });
    }

    const handleClickShowPassword = (first = null) => {
        if (first) {
            setShowPassword(!showPassword);
            return
        }
        setShowRepeatPassword(!showRepeatPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validateSend = () => {
        let errorsObject = {};

        Object.keys(data).forEach(field => {
            if (!data[field]) {
                errorsObject[field] = i18n.required;
            }
        });

        setErrors(errorsObject);

        if (data.password.length < 8) {
            errorsObject.password = i18n.password_length;
        }

        if (data.repeatPassword != data.password) {
            errorsObject.repeatPassword = i18n.wrong_pass;
        }
        console.log(!validateEmail(data.email));

        if (!validateEmail(data.email)) {
            errorsObject.email = i18n.invalid_email;
        }

        if (Object.keys(errorsObject).length > 0) {
            return true
        }

        return false
    }

    const submit = async () => {

        if (validateSend()) {
            return
        }

        setLoading(true);

        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataJson = await res.json();

            if (!dataJson.success) {
                setDialog({
                    title: 'Error',
                    description: dataJson.message,
                    error: true
                })
                setLoading(false);
                return setOpenDialog(true);
            }

            router.push('/senbazuru/login');

        } catch (error) {
            console.log(error);
            setDialog({
                title: 'Error Connection',
                description: 'dataJson.message',
                error: true
            })
        }
        setLoading(false);
    }

    return (
        <div className={Styles.root}>
            <Paper elevation={1} className={Styles.card} >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" color="primary">{i18n.register}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            maxLength={12}
                            id="firstName"
                            label={i18n.firstName}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.firstName}
                            onChange={handleData}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="lastName"
                            label={i18n.lastName}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.lastName}
                            onChange={handleData}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label={i18n.email}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.email}
                            onChange={handleData}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            label={i18n.password}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.password}
                            onChange={handleData}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword(true)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type={showRepeatPassword ? 'text' : 'password'}
                            id="repeatPassword"
                            label={i18n.repeat_password}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.repeatPassword}
                            onChange={handleData}
                            error={!!errors.repeatPassword}
                            helperText={errors.repeatPassword}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword(false)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showRepeatPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => submit()}
                        >
                            {i18n.send}
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Link passHref href="/senbazuru/login">
                            <Typography variant="subtitle2" color="textSecondary" className={Styles.linkRegister}>
                                {i18n.login}
                            </Typography>
                        </Link>
                    </Grid>

                </Grid>
            </Paper>

            <Backdrop style={{ color: '#fff', zIndex: 999 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <ModalAlert setOpenDialog={setOpenDialog} openDialog={openDialog} dialog={dialog} />
        </div>
    );
}
