import React from 'react';
import { Typography, Divider, ListItem, Avatar, Button, CircularProgress } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import Styles from '../../../styles/senbazuru.module.css';
import ListSkeleton from '../components/listSkeleton';

export default function TabPanelAddFriends({ users, setUsers, user }) {
    const [loading, setLoading] = React.useState(false);

    const sendFriendRequest = async (friendId) => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/sendFriendRequest', {
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

            setUsers(prev => {
                prev[prev.findIndex(e => e._id == dataJson.id)].friendsRequests.push(user._id);
                return prev
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const cancelFriendRequest = async (friendId) => {
        setLoading(true);

        try {

            const res = await fetch('/api/user/cancelFriendRequest', {
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

            setUsers(prev => {
                let index = prev.findIndex(e => e._id == dataJson.id);
                prev[index].friendsRequests = prev[index].friendsRequests.filter(e => e != user._id);
                return prev
            });
            setLoading(false);
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

            {users?.length > 0 ?
                users.map((globalUser, index) => {
                    let sended = globalUser.friendsRequests.includes(user._id);
                    return (
                        <ListItem key={index} className={Styles.listItemUser}>
                            
                            <Avatar
                                src={globalUser.imgUrl ? `https://res.cloudinary.com/mudarra/image/upload/v1631925154/${globalUser.imgUrl}` : './img/header.png'}
                            />

                            <div className={Styles.listAdd}>
                                <Typography variant="subtitle1">
                                    {globalUser.firstName} {globalUser.lastName}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color={sended ? "secondary" : "primary"}
                                    onClick={() => sended ? cancelFriendRequest(globalUser._id) : sendFriendRequest(globalUser._id)}
                                    disabled={loading}
                                >
                                    {loading ?
                                        <CircularProgress style={{ width: 25, height: 25 }} color="inherit" /> :
                                        (sended ? "Cancelar" : "Agregar")
                                    }
                                </Button>
                            </div>
                        </ListItem>
                    )
                }) :
                <ListSkeleton />
            }


        </>
    );
}
