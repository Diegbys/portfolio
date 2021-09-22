import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Styles from '../../styles/senbazuru.module.css';
import HomeSenbazuru from './home';
import MenuLeft from './menuLeft';
import useAuth from '../../src/auth/useAuth';
import ChatUserBar from './components/chatUserBar';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
}));

const Chat = dynamic(() => import('./chat'), { ssr: false });

export default function Senbazuru(props) {
    const { user, isLogged, actualChat } = useAuth();
    const router = useRouter();
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect(() => {
        if (!isLogged()) {
            router.push('/senbazuru/login');
        }
    }, [isLogged, router]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={Styles.root}>
            <Head>
                <link rel="icon" href="/img/senbazuru.svg" />
                <title>Senbazuru</title>
                <meta
                    name="description"
                    content='This is a messenger app'
                />
            </Head>

            <CssBaseline />

            {actualChat &&
                <ChatUserBar user={user} handleDrawerToggle={handleDrawerToggle} />
            }

            <MenuLeft
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <main className={Styles.content}>
                {actualChat ?
                    <>
                        <div className={classes.toolbar} />
                        <Chat />
                    </> :
                    <HomeSenbazuru handleDrawerToggle={handleDrawerToggle} />
                }
            </main>
        </div>
    )
}
