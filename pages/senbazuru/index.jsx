import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/dist/client/router';
import { io } from "socket.io-client";

import Styles from '../../styles/senbazuru.module.css';
import HomeSenbazuru from './home';
import MenuLeft from './menuLeft';
import useAuth from '../../src/auth/useAuth';
import Chat from './chat';
import ChatUserBar from './components/chatUserBar';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
}));

export default function Senbazuru(props) {
    const { user, isLogged, actualChat } = useAuth();
    const router = useRouter();
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [arrivalMessage, setArrivalMessage] = React.useState(null);
    const socket = React.useRef();

    React.useEffect(() => {
        if (!isLogged()) {
            router.push('/senbazuru/login');
        }
    }, []);

    React.useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, []);

    React.useEffect(() => {
        if (user) {
            socket.current.emit("addUser", user._id);
            socket.current.on("getUsers", users => {
                // console.log(users);
            })
        }
    }, [user]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const refreshSendMessage = (newMessage) => {
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: actualChat.members.find(member => member._id !== user._id)._id,
            text: newMessage
        });
    }

    return (
        <div className={Styles.root}>
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
                        <Chat
                            refreshSendMessage={(newMessage) => refreshSendMessage(newMessage)}
                            arrivalMessage={arrivalMessage}
                        />
                    </> :
                    <HomeSenbazuru />
                }
            </main>
        </div>
    )
}
