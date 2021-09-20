import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Divider, IconButton, List, ListItem, ListItemText, Avatar, Badge } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';

import Styles from '../../../styles/senbazuru.module.css';
import ListSkeleton from '../components/listSkeleton';
import useAuth from '../../../src/auth/useAuth';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

export default function PrincipalDrawer({ setOpenAllUsers, loading, setUserConfiguration }) {
    const classes = useStyles();
    const theme = useTheme();
    const { setActualChat, user, conversations } = useAuth();

    return (
        <div>
            <div className={classes.toolbar + ' ' + Styles.userToolbar}>
                <Avatar
                    alt="User Image"
                    src={user?.imgUrl ? `https://res.cloudinary.com/mudarra/image/upload/v1631925154/${user.imgUrl}` : './img/header.png'}
                    style={{ cursor: 'pointer' }}
                />
                <div>
                    <IconButton
                        color="inherit"
                        aria-label="Add friends"
                        onClick={() => setOpenAllUsers(true)}
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open options"
                        onClick={() => setUserConfiguration(true)}
                    >
                        <SettingsIcon />
                    </IconButton>
                </div>

            </div>

            <Divider />

            <div className={Styles.inputSearchContainer}>
                <SearchIcon />
                <input type="text" placeholder="Search..." />
            </div>

            <Divider />

            <List>
                {!loading ? (
                    conversations.length > 0 ?
                        conversations.map((conversation, index) => {
                            let member = conversation.members.filter(e => e._id != user._id)[0];
                            console.log(member)

                            return (
                                <ListItem key={index} button className={Styles.listItemUser} onClick={() => setActualChat(conversation)}>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                        color="primary"
                                        invisible={false}
                                    >
                                        <Avatar
                                            src={member.imgUrl ? `https://res.cloudinary.com/mudarra/image/upload/v1631925154/${member.imgUrl}` : './img/header.png'}
                                        />
                                    </Badge>
                                    <ListItemText className={Styles.listTextUser}>
                                        <Typography variant="subtitle1">
                                            {member.firstName} {member.lastName}
                                        </Typography>
                                        <Typography variant="subtitle2" noWrap>
                                            {conversation.lastMessage?.text}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            )
                        }) : <p>No chats yet :(</p>
                ) :
                    <ListSkeleton />
                }
            </List>
        </div >
    );
}
