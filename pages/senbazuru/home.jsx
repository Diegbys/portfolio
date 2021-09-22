import React from 'react';
import { Typography, Divider, Hidden, IconButton } from '@material-ui/core';
import { useTheme } from "@material-ui/core/styles";
import Image from 'next/image';
import { motion } from 'framer-motion';
import ComputerIcon from '@material-ui/icons/Computer';
import MenuIcon from '@material-ui/icons/Menu';

import SenbazuruIcon from '../../public/img/senbazuru.svg';
import Styles from '../../styles/senbazuru.module.css';
import i18nContext from '../../src/context/i18n';

export default function HomeSenbazuru({ handleDrawerToggle }) {
    const theme = useTheme();
    const { i18n } = React.useContext(i18nContext);
    const [update, setUpdate] = React.useState(0);

    const logoVariant = { hidden: { x: -100, y: -100, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } };
    const text1Variant = { hidden: { x: 250, opacity: 0 }, visible: { x: 0, opacity: 1 } };
    const text2Variant = { hidden: { y: 200, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    React.useEffect(() => {
        setUpdate(1);
    }, []);

    return (
        <div className={Styles.indexChat}>
            <motion.div
                variants={logoVariant}
                initial="hidden"
                animate="visible"
                transition={{ type: "just", duration: 2 }}
            >
                <Image src={SenbazuruIcon} width={300} height={300} alt="Senbazuru icon" />
            </motion.div>
            <motion.div
                variants={text1Variant}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 2, delay: 0.5 }}
            >
                <Typography variant="h6" paragraph>{i18n.keep_contact}</Typography>
            </motion.div>

            <Divider />

            <motion.div
                variants={text2Variant}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 1.5, delay: 1.5 }}
            >
                <Typography paragraph align="center" color="textPrimary">{i18n.add_friends}</Typography>
            </motion.div>

            <motion.div
                variants={text2Variant}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 1.5, delay: 2.5 }}
            >
                <Typography align="center" color="textSecondary" className={Styles.created_by}>
                    <ComputerIcon />
                    {i18n.created_by}
                </Typography>
            </motion.div>
            <Hidden mdUp implementation="css" className={Styles.homeMenuIcon}>
                <IconButton
                    color="inherit"
                    onClick={() => handleDrawerToggle()}
                >
                    <MenuIcon />
                </IconButton>
            </Hidden>
        </div>
    )
}
