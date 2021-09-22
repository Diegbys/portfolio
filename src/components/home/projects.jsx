import React from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';
import { Button, Typography } from '@material-ui/core';
import Link from 'next/link';

import i18nContext from '../../context/i18n';
import Styles from '../../../styles/Home.module.css';

export default function Projects(props) {
    const { i18n } = React.useContext(i18nContext);
    const [selectedId, setSelectedId] = React.useState(0);

    const items = [
        {
            id: "a",
            category: "Senbazuru",
            title: i18n.senbazuru_title,
            img: 'prev-senbazuru.png',
            link: '/senbazuru/login',
            description: i18n.senbazuru_description
        },
        {
            id: "b",
            category: "Iconic Game Deals",
            title: i18n.iconic_title,
            img: 'prev-iconicgamedeals.png',
            link: 'http://iconic-game-deals.herokuapp.com/',
            description: i18n.iconic_description
        },
    ];

    const Card = ({ id, title, category, img }) => {
        return (
            <li className={Styles.card_project} onClick={() => setSelectedId(id)}>
                <div className={Styles.card_content_container}>
                    <motion.div className={Styles.card_content} layoutId={`card-container-${id}`}>
                        <motion.div
                            className={Styles.card_image_container}
                            layoutId={`card-image-container-${id}`}
                        >
                            <Image src={require(`../../../public/img/${img}`)} />
                        </motion.div>
                        <motion.div
                            className={Styles.title_container}
                            layoutId={`title-container-${id}`}
                        >
                            <span className={Styles.category}>{category}</span>
                            <h2>{title}</h2>
                        </motion.div>
                        <div className={Styles.background_card} />
                    </motion.div>
                </div>
            </li>
        );
    }

    const Item = ({ id }) => {
        const { category, title, description, img, link } = items.find(item => item.id === id);

        return (
            <>
                <motion.div
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className={Styles.overlay}
                    onClick={() => setSelectedId(0)}
                >
                </motion.div>

                <div className={`${Styles.card_content_container} ${Styles.open}`}  >
                    <motion.div className={Styles.card_content} layoutId={`card-container-${id}`}>

                        <motion.div className={Styles.card_image_container} layoutId={`card-image-container-${selectedId}`} >
                            <Image src={require(`../../../public/img/${img}`)} />
                            <div className={Styles.background_card} />
                        </motion.div>

                        <motion.div className={Styles.title_container} layoutId={`title-container-${selectedId}`}>
                            <span className={Styles.category}>{category}</span>
                            <h2>{title}</h2>
                        </motion.div>

                        <motion.div className={Styles.content_container} animate>
                            <p>{description}</p>
                            <Link href={link} passHref>
                                <Button color="primary" variant="outlined" >{i18n.go} </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <section>
            <Typography align='left' variant="h3" className="section-title">
                {i18n.projects}
            </Typography>

            <AnimateSharedLayout type="crossfade">
                <ul className={Styles.card_list}>
                    {items.map(card => (
                        <Card key={card.id} {...card} isSelected={card.id === selectedId} />
                    ))}
                </ul>
                <AnimatePresence>
                    {selectedId && <Item id={selectedId} key="item" />}
                </AnimatePresence>
            </AnimateSharedLayout>
        </section>
    )
}
