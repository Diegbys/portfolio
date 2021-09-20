import React from 'react';
import { Paper, Grid, TextField, Button, Typography, InputAdornment, IconButton } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import i18nContext from '../../src/context/i18n';
import Styles from '../../styles/login.module.css';
import useAuth from '../../src/auth/useAuth';
import Layout from '../../src/components/Layout';

export default function Login() {
    const router = useRouter();
    const { login, setLoading, setDialog, setOpenDialog } = useAuth();
    const { i18n } = React.useContext(i18nContext);
    const [showPassword, setShowPassword] = React.useState(false);

    const [data, setData] = React.useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = React.useState({});


    const handleData = (event) => {
        setData({ ...data, ...{ [event.target.id]: event.target.value } });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validateSend = () => {
        if (!data.email || !data.password) {
            return true
        }
        return false
    }

    const submit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/login', {
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
                setOpenDialog(true);
                return
            }

            login(dataJson.user);
            router.push('/senbazuru');
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    return (
        <Layout title="Login">
            <div className={Styles.root}>
                <Paper elevation={1} className={Styles.card} >
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Typography variant="h4" color="primary">{i18n.login}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                label={i18n.email}
                                variant="outlined"
                                size="medium"
                                fullWidth
                                value={data.email}
                                onChange={handleData}
                                error={!!errors.email}
                                helperText={errors.email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon color="textSecondary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                label={i18n.password}
                                variant="outlined"
                                size="medium"
                                fullWidth
                                value={data.password}
                                onChange={handleData}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
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
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => submit()}
                                disabled={validateSend()}
                            >
                                {i18n.send}
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="textSecondary">
                                {i18n.forgot_password}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Link href="/senbazuru/register">
                                <Typography variant="subtitle2" color="textSecondary" className={Styles.linkRegister}>
                                    {i18n.register}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </Layout>
    );
}
