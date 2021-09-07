import React from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';

import Styles from '../../../styles/contact.module.css';
import i18nContext from '../../context/i18n';

export default function FormContact({ setOpen, setDialog, setOpenDialog }) {
    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        text: ''
    });
    const [errors, setErrors] = React.useState({});
    const { i18n } = React.useContext(i18nContext);

    const handleData = (event) => {
        setData({ ...data, ...{ [event.target.id]: event.target.value } });
    }

    const submit = async () => {
        if (!validateSubmit()) {
            return false;
        }

        try {
            setOpen(true);
            const res = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataJson = await res.json();

            if (dataJson.success) {
                setDialog({
                    title: i18n.sended_message,
                    description: `${i18n.thank_for_contact} ${dataJson.message.firstName} ${dataJson.message.lastName}. ${i18n.will_contact}`
                })
                setData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    text: ''
                });
                setOpen(false);
                setOpenDialog(true);
            }



        } catch (error) {
            console.log(error);
        }
    }

    const validateSubmit = () => {
        let errorsObject = {};
        Object.keys(data).forEach(field => {
            if (!data[field]) {
                errorsObject[field] = i18n.required;
            }
        });

        setErrors(errorsObject);

        if (Object.keys(errorsObject).length > 0) {
            return false
        }

        return true
    }

    return (
        <Paper elevation={0} className={Styles.formContainer}>
            <form>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={6} xl={6} xs={12}>
                        <TextField
                            id="firstName"
                            label={i18n.firstName}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.firstName}
                            onChange={handleData}
                            error={errors.firstName ? true : false}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xl={6} xs={12}>
                        <TextField
                            id="lastName"
                            label={i18n.lastName}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.lastName}
                            onChange={handleData}
                            error={errors.lastName ? true : false}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                        <TextField
                            id="email"
                            label={i18n.email}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.email}
                            onChange={handleData}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                        <TextField
                            id="text"
                            label={i18n.message}
                            multiline
                            maxRows={4}
                            variant="outlined"
                            fullWidth
                            value={data.text}
                            onChange={handleData}
                            error={errors.text ? true : false}
                            helperText={errors.text}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                        <Button variant="contained" color="primary" onClick={() => submit()}>
                            {i18n.send}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}
