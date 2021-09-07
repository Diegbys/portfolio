import React from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';
import { Button } from '@material-ui/core';
import i18nContext from '../../context/i18n';

export default function Projects(props) {
    const { i18n } = React.useContext(i18nContext);
    const [selectedId, setSelectedId] = React.useState(0);
    const items = [
        // Photo by ivan Torres on Unsplash
        {
            id: "c",
            category: "Pizza",
            title: "5 Food Apps Delivering the Best of Your City",
            pointOfInterest: 80,
            backgroundColor: "#814A0E"
        },
        // Photo by Dennis Brendel on Unsplash
        {
            id: "f",
            category: "How to",
            title: "Arrange Your Apple Devices for the Gram",
            pointOfInterest: 120,
            backgroundColor: "#959684"
        },
        // Photo by Alessandra Caretto on Unsplash
        {
            id: "a",
            category: "Pedal Power",
            title: "Map Apps for the Superior Mode of Transport",
            pointOfInterest: 260,
            backgroundColor: "#5DBCD2"
        },
        // Photo by Taneli Lahtinen on Unsplash
        {
            id: "g",
            category: "Holidays",
            title: "Our Pick of Apps to Help You Escape From Apps",
            pointOfInterest: 200,
            backgroundColor: "#8F986D"
        },
        // Photo by Simone Hutsch on Unsplash
        {
            id: "d",
            category: "Photography",
            title: "The Latest Ultra-Specific Photography Editing Apps",
            pointOfInterest: 150,
            backgroundColor: "#FA6779"
        },
        // Photo by Siora Photography on Unsplash
        {
            id: "h",
            category: "They're all the same",
            title: "100 Cupcake Apps for the Cupcake Connoisseur",
            pointOfInterest: 60,
            backgroundColor: "#282F49"
        },
        // Photo by Yerlin Matu on Unsplash
        {
            id: "e",
            category: "Cats",
            title: "Yes, They Are Sociopaths",
            pointOfInterest: 200,
            backgroundColor: "#AC7441"
        },
        // Photo by Ali Abdul Rahman on Unsplash
        {
            id: "b",
            category: "Holidays",
            title: "Seriously the Only Escape is the Stratosphere",
            pointOfInterest: 260,
            backgroundColor: "#CC555B"
        }
    ];
    const openSpring = { type: "spring", stiffness: 200, damping: 30 };
    const imageHasLoaded = true;

    const Card = ({ id, title, category, theme }) => {
        return (
            <li className={`card ${theme}`} onClick={() => setSelectedId(id)}>
                <div className="card-content-container">
                    <motion.div className="card-content" layoutId={`card-container-${id}`}>
                        <motion.div
                            className="card-image-container"
                            layoutId={`card-image-container-${id}`}
                        >
                            <Image src={require(`../../../public/img/a.jpg`)} className="card-image" alt="Project Image"/>
                        </motion.div>
                        <motion.div
                            className="title-container"
                            layoutId={`title-container-${id}`}
                        >
                            <span className="category">{category}</span>
                            <h2>{title}</h2>
                        </motion.div>
                    </motion.div>
                </div>
            </li>
        );
    }

    const Item = ({ id }) => {
        const { category, title } = items.find(item => item.id === id);

        return (
            <>
                <motion.div
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    // transition={{ duration: 0.1, delay: 0.15 }}
                    style={{ pointerEvents: "auto" }}
                    className="overlay"
                    onClick={() => setSelectedId(0)}
                >
                </motion.div>
                <div className="card-content-container open" >
                    <motion.div
                        // initial={{ opacity: 0 }}
                        // transition={{ duration: 1, delay: 0.15 }}
                        // animate={{ opacity: 1 }}
                        className="card-content"
                        layoutId={`card-container-${id}`}
                    >
                        <motion.div
                            className="card-image-container"
                            layoutId={`card-image-container-${selectedId}`}
                        >
                            <Image src={require(`../../../public/img/a.jpg`)} className="card-image" alt="project image" />

                        </motion.div>
                        <motion.div
                            className="title-container"
                            layoutId={`title-container-${selectedId}`}
                        >
                            <span className="category">{category}</span>
                            <h2>{title}</h2>
                        </motion.div>
                        <motion.div className="content-container" animate>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus consectetur culpa nesciunt eum quis itaque accusamus dolorem repellat libero nam, impedit officiis vitae reprehenderit eveniet sapiente? Fugit, facere itaque!</p>
                        </motion.div>
                    </motion.div>
                </div>
            </>
        );
    }


    return (
        <section>
            <AnimateSharedLayout type="crossfade">
                <ul className="card-list">
                    {items.map(card => (
                        <Card key={card.id} {...card} isSelected={card.id === selectedId} />
                    ))}
                </ul>
                <AnimatePresence>
                    {selectedId && imageHasLoaded && <Item id={selectedId} key="item" />}
                </AnimatePresence>
            </AnimateSharedLayout>
        </section>


    )
}


