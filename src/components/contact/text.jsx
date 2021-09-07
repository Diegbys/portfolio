import React from 'react';
import { Typography } from '@material-ui/core';
import Image from 'next/image';
import { useTheme } from '@material-ui/core/styles';

import Styles from '../../../styles/contact.module.css';
import Form from '../../../public/img/email.svg';
import i18nContext from '../../context/i18n';

export default function TextContact(props) {
    const theme = useTheme();
    const { i18n } = React.useContext(i18nContext);

    const styles = {
        blueText: {
            color: theme.palette.primary.main
        },
        subtitle: {
            fontWeight: 100,
            marginBottom: 20
        },
    }

    return (
        <div>
            <Typography align='left' variant="h1" className={Styles.titleContact}>
                {i18n.contact_title} <span style={styles.blueText}>{i18n.contact_title_me}</span>
            </Typography>
            <Typography align='left' variant="h6" style={styles.subtitle}>
                {i18n.contact_subtitle}
            </Typography>

            <div className={Styles.image}>
                <Image src={Form} alt="contact image" />
            </div>
        </div>
    )
}
