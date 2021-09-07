import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Image from 'next/image';
import { motion } from "framer-motion";

import header from '../../../public/img/header.png';
import Styles from '../../../styles/index.module.css';
import i18nContext from '../../context/i18n';

export default function Header(props) {
    const theme = useTheme();
    const { i18n } = React.useContext(i18nContext);

    return (
        <div className={Styles.containerHeader}>
            <div className={Styles.opacityBackground}></div>

            <Image className={Styles.imageHeader} src={header} alt="Header Image" />

            <div className={Styles.containerText}>
                <motion.div
                    variants={{ hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        type: "spring",
                        duration: 0.8
                    }}
                >
                    <Typography className={Styles.white} align='center' variant="h1">
                        Diegbys Mudarra
                    </Typography>
                </motion.div>

                <motion.div
                    variants={{ hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        type: "spring",
                        duration: 0.9
                    }}
                >
                    <Typography className={Styles.white} align='center' variant="h5">
                        {i18n.ocupation}
                    </Typography>
                </motion.div>
            </div>
        </div>
    )
}
