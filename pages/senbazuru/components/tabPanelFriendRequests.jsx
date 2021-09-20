import React from 'react';
import { Typography, Divider, IconButton, ListItem, Avatar, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';

import Styles from '../../../styles/senbazuru.module.css';
import ListSkeleton from '../components/listSkeleton';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function TabPanelFriendRequests({ friendRequests, loading, user, setFriendRequests }) {
    const [sending, setSending] = React.useState(false);

    const cancelOrAccept = async (action, requesterId) => {
        setSending(true);
        try {
            const res = await fetch(`/api/user/confirmFriendRequest`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    action,
                    requesterId,
                    userId: user._id
                })
            });

            const dataJson = await res.json();

            setSending(false);
            setFriendRequests(prev => {
                let index = prev.findIndex(e => e._id == requesterId);
                return prev.filter((e, i) => i != index);
            });
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

                friendRequests?.length > 0 ?
                    friendRequests.map((requester, index) => (
                        <ListItem key={index} className={Styles.listItemUser}>
                            <Avatar alt="Remy Sharp" src='./img/header.png' />
                            <div className={Styles.listAdd}>
                                <Typography variant="subtitle1">
                                    {requester.firstName} {requester.lastName}
                                </Typography>
                                {sending ? <CircularProgress style={{ width: 25, height: 25 }} color="inherit" /> :
                                    <div>
                                        <IconButton
                                            color="inherit"
                                            aria-label="Add friends"
                                            onClick={() => cancelOrAccept("accept", requester._id)}
                                        >
                                            <CheckCircleIcon color="primary" />
                                        </IconButton>
                                        <IconButton
                                            color="inherit"
                                            aria-label="Add friends"
                                            onClick={() => cancelOrAccept("cancel", requester._id)}
                                        >
                                            <CancelIcon color="error" />
                                        </IconButton>
                                    </div>
                                }
                            </div>
                        </ListItem>
                    )) :
                    <p>Sin peticiones</p>
            ) :
                < ListSkeleton />
            }
        </>
    );
}
