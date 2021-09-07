import React from 'react';
import { Typography, Grid, Backdrop, CircularProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';

import Layout from '../src/components/Layout';
import Styles from '../styles/contact.module.css';
import FormContact from '../src/components/contact/form';
import TextContact from '../src/components/contact/text';
import ModalAlert from '../src/components/modalAlert';

export default function Contact(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialog, setDialog] = React.useState({});

    const styles = {
        blueText: {
            color: theme.palette.primary.main
        },
        subtitle: {
            fontWeight: 100,
            marginBottom: 20
        },
        backdrop: {
            zIndex: 99999999999,
            color: '#fff',
        },
        gridContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: "column"
        }
    }

    return (
        <Layout title='Contact' >
            <div className="container alignVertical">
                <Grid container spacing={5}>

                    <Grid item lg={6} md={6} sm={12} xl={6}>
                        <TextContact />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xl={6} style={styles.gridContainer}>
                        <FormContact setOpen={setOpen} setDialog={setDialog} setOpenDialog={setOpenDialog} />

                        <div className={Styles.emailContainer}>
                            <EmailIcon style={{ color: '#a7a7a7' }} />

                            <Typography variant="subtitle1" >
                                <a href="mailto:diegbysmudarra@gmail.com">
                                    diegbysmudarra@gmail.com
                                </a>
                            </Typography>
                        </div>
                    </Grid>

                </Grid>
            </div>

            <Backdrop style={styles.backdrop} open={open} onClick={() => setOpen(!open)}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <ModalAlert setOpenDialog={setOpenDialog} openDialog={openDialog} dialog={dialog} />

        </Layout >
    )
}
