import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';

import Styles from '../../styles/footer.module.css';
import Logo from '../../public/img/logo.png';
import i18nContext from '../context/i18n';

export default function Footer() {
    const { i18n } = React.useContext(i18nContext);

    return (
        <Paper classes={{ root: Styles.footerContainer }} elevation={3}>
            <div className={Styles.socialMediaContainer}>
                <Image
                    width={50}
                    height={50}
                    src={Logo}
                    alt="Logo Image"
                />
                <div>
                    <a href="https://www.facebook.com/diegbysezequiel.mudarraespinoza/">
                        <FacebookIcon />
                    </a>
                    <a href="https://www.instagram.com/diegbys/?hl=es">
                        <InstagramIcon />
                    </a>
                    <a href="https://github.com/Diegbys">
                        <GitHubIcon />
                    </a>
                </div>
            </div>
            <Typography align='center' variant="subtitle1">
                {i18n.footer}
            </Typography>
        </Paper>
    )
}
