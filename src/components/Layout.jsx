import React from 'react';
import Head from 'next/head';

import HideAppBar from '../components/hideAppBar';
import Footer from '../components/footer';

export default function Layout({ children, title, home = false }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/img/logo_white.png" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <title>{title} | Diegbys</title>
                <meta
                    name="description"
                    content='Portfolio'
                />
            </Head>

            <HideAppBar home={home} />

            <main>{children}</main>

            <Footer />
        </div>
    )
}
