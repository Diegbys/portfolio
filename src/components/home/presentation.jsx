import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import CodeSvg from "../../../public/img/code.svg";
import i18nContext from '../../context/i18n';
import Styles from '../../../styles/index.module.css';


export default function Presentation() {
    const theme = useTheme();
    const { i18n } = React.useContext(i18nContext);

    const styles = {
        fontW: {
            fontWeight: "500"
        },
        blueTitle: {
            color: theme.palette.primary.main,
            fontSize: 60
        },
        subTitle: {
            fontWeight: "100",
            fontSize: 20,
        },
    }

    const textVariant = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    }

    const imageVariant = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
        },
    }

    const controls = useAnimation();
    const { ref, inView } = useInView();

    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <section>
            <Grid container spacing={1}>
                <Grid item sm={12} md={6} container alignItems="center" className={Styles.firstGrid}>
                    <motion.div
                        ref={ref}
                        variants={textVariant}
                        initial="hidden"
                        animate={controls}
                        transition={{
                            type: "tween",
                            duration: 0.7
                        }}
                    >
                        <Typography align="left" variant="h4" style={styles.fontWeight}>
                            <span style={styles.blueTitle}>{i18n.hello}</span> {i18n.presentation_title} <br />
                            <span style={styles.subTitle}>{i18n.presentation_subtitle}</span>
                        </Typography>
                    </motion.div>
                </Grid>
                <Grid item sm={12} md={6} className="firstGrid">
                    <motion.div
                        ref={ref}
                        variants={imageVariant}
                        initial="hidden"
                        animate={controls}
                        transition={{
                            type: "tween",
                            duration: 0.7
                        }}
                    >
                        <Image src={CodeSvg} alt="code image" />
                    </motion.div>

                </Grid>
            </Grid>
        </section>
    )
}
