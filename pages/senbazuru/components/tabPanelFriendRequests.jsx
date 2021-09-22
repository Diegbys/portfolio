import React from 'react';
import { Typography, Divider, IconButton, ListItem, Avatar, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Styles from '../../../styles/senbazuru.module.css';
import ListSkeleton from '../components/listSkeleton';
import i18nContext from '../../../src/context/i18n';

export default function TabPanelFriendRequests({ friendRequests, loading, user, setFriendRequests }) {
    const [sending, setSending] = React.useState(false);
    const { i18n } = React.useContext(i18nContext);

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
                            <Avatar
                                src={requester.imgUrl ? `https://res.cloudinary.com/mudarra/image/upload/v1631925154/${requester.imgUrl}` : './img/header.png'}
                            />
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
                    <p>{i18n.no_requests}</p>
            ) :
                < ListSkeleton />
            }
        </>
    );
}
