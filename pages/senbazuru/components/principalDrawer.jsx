import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, IconButton, List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';

import Styles from '../../../styles/senbazuru.module.css';
import ListSkeleton from '../components/listSkeleton';
import useAuth from '../../../src/auth/useAuth';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

export default function PrincipalDrawer({ setOpenAllUsers, loading }) {
    const classes = useStyles();
    const { setActualChat, user, conversations } = useAuth();

    return (
        <div>
            <div className={classes.toolbar + ' ' + Styles.userToolbar}>
                <Avatar alt="Remy Sharp" src='./img/header.png' />
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

                            return (
                                <ListItem key={index} button className={Styles.listItemUser} onClick={() => setActualChat(conversation)}>
                                    <Avatar alt="Remy Sharp" src='./img/header.png' />
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
