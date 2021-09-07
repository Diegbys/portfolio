import React from 'react';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

import Layout from '../src/components/Layout';
import Header from '../src/components/home/header';
import Skills from '../src/components/home/skills';
import Presentation from '../src/components/home/presentation';
import i18nContext from '../src/context/i18n';
import Projects from '../src/components/home/projects';

import connectDB from '../src/lib/dbConnect';
import Skill from '../src/models/Skill';


export default function Home(props) {
    const { i18n } = React.useContext(i18nContext);

    return (
        <Layout title={i18n.title_home} home>

            <Header />

            <div className="container">
                <Presentation />
                <Skills props={props} />
                {/* <Projects/> */}
            </div>

        </Layout >
    )
}

export async function getServerSideProps() {
    try {
        await connectDB();

        const res = await Skill.find({});
        const skills = res.map(doc => {
            let skill = doc.toObject();
            skill._id = `${skill._id}`;
            return skill;
        });

        return { props: { skills } }
    } catch (error) {
        console.log(error);
        return { props: { error: true } }
    }
}
