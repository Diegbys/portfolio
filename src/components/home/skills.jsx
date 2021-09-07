import React from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import Image from 'next/image';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import Skeleton from '@material-ui/lab/Skeleton';

import i18nContext from '../../context/i18n';

export default function Skills({ props }) {
    const { i18n } = React.useContext(i18nContext);

    const skillsVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1
        }
    }

    const controls = useAnimation();
    const { ref, inView } = useInView();

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const styles = {
        cardTitle: {
            marginTop: 10,
            fontSize: 10
        }
    }

    if (props.error) {
        return (
            <Skeleton variant="rect" animation="wave" width="100%" height={118} />
        )
    }

    return (
        <section>
            <Typography align='left' variant="h3" className="section-title">
                {i18n.skills}
            </Typography>

            <Grid container spacing={2} >

                {props.skills.map((skill, index) => (
                    <Grid item lg={1} md={2} sm={3} xs={4} key={index}>
                        <motion.div
                            ref={ref}
                            variants={skillsVariants}
                            initial="hidden"
                            animate={controls}
                            transition={{
                                type: "tween",
                                duration: 0.2 + index / 20
                            }}
                        >
                            <Paper elevation={3} style={{ padding: 20 }}>
                                <Image
                                    src={require(`../../../public/img/${skill.img}`)}
                                    layout="responsive"
                                    height={80}
                                    width='100%'
                                    alt="skills image"
                                />
                                <Typography align='center' variant="subtitle1" style={styles.cardTitle}>
                                    {skill.title}
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}

            </Grid>
        </section>
    )
}
