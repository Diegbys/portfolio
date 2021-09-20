import React from 'react';
import { Typography, Divider, IconButton, ListItem, Avatar, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';

import Styles from '../../../styles/senbazuru.module.css';
import ListSkeleton from '../components/listSkeleton';
import ChatIcon from '@material-ui/icons/Chat';
import useAuth from '../../../src/auth/useAuth';

export default function TabPanelFriends({ friends, setFriends, loading, setOpenAllUsers }) {
    const [sending, setSending] = React.useState(false);
    const { getConversations, conversations, actualChat, user, setActualChat } = useAuth();

    const deleteFriend = async (friendId) => {
        setSending(true);

        try {

            const res = await fetch('/api/user/deleteFriend', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: user._id,
                    friendId
                })
            })
            const dataJson = await res.json();

            if (!dataJson.success) {
                alert("error");
                return
            }

            setFriends(prev => {
                prev = prev.filter(e => e._id != dataJson.id);
                return prev
            });
            setSending(false);
        } catch (error) {
            console.log(error);
        }
    }

    const startChat = async (friend) => {
        let returned = false
        conversations.forEach(conversation => {
            if (conversation.members.map(e => e._id).includes(friend._id)) {
                setActualChat(conversation);
                setOpenAllUsers(false);
                returned = true;
            }
        });

        if (returned) {
            return
        }

        try {
            const res = await fetch('/api/conversation', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    senderId: user._id,
                    receiverId: friend._id
                })
            })

            const dataJson = await res.json();

            if (!dataJson.success) {
                alert("error");
                return
            }

            getConversations();
            setActualChat(dataJson.conversation);
            setOpenAllUsers(false);

        } catch (error) {
            console.log(error);
        }


    }


    return (
        <>
            <div className={Styles.inputSearchContainer}>
                <SearchIcon />
                <input type="text" placeholder="Search..." />
            </div>

            <Divider />

            {!loading ? (

                friends?.length > 0 ?
                    friends.map((friend, index) => (
                        <ListItem key={index} className={Styles.listItemUser}>
                            <Avatar alt="Remy Sharp" src='./img/header.png' />
                            <div className={Styles.listAdd}>
                                <Typography variant="subtitle1">
                                    {friend.firstName} {friend.lastName}
                                </Typography>
                                <div>
                                    <IconButton
                                        color="inherit"
                                        aria-label="Add friends"
                                        onClick={() => startChat(friend)}
                                    >
                                        <ChatIcon color="primary" />
                                    </IconButton>
                                    <IconButton
                                        color="inherit"
                                        aria-label="Add friends"
                                        onClick={() => deleteFriend(friend._id)}
                                    >
                                        {sending ?
                                            <CircularProgress style={{ width: 25, height: 25 }} color="inherit" /> :
                                            <DeleteIcon color="error" />
                                        }

                                    </IconButton>
                                </div>

                            </div>
                        </ListItem>
                    )) :
                    <p>Sin amigos :(</p>
            ) :
                < ListSkeleton />
            }
        </>
    );
}
