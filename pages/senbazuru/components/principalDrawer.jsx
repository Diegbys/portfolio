import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, IconButton, List, ListItem, ListItemText, Avatar, Hidden } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Styles from '../../../styles/senbazuru.module.css';
import ListSkeleton from '../components/listSkeleton';
import useAuth from '../../../src/auth/useAuth';
import i18nContext from '../../../src/context/i18n';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

export default function PrincipalDrawer({ setOpenAllUsers, loading, setUserConfiguration, close }) {
    const classes = useStyles();
    const { setActualChat, user, conversations } = useAuth();
    const { i18n } = React.useContext(i18nContext);

    return (
        <div>
            <div className={classes.toolbar + ' ' + Styles.userToolbar}>
                <Avatar
                    alt="User Image"
                    src={user?.imgUrl ? `https://res.cloudinary.com/mudarra/image/upload/v1631925154/${user.imgUrl}` : './img/header.png'}
                    style={{ cursor: 'pointer' }}
                />

                <div style={{ display: 'flex' }}>
                    <Hidden mdUp implementation="css">
                        <IconButton
                            color="inherit"
                            onClick={() => close()}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Hidden>

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

                            return (
                                <ListItem key={index} button className={Styles.listItemUser} onClick={() => setActualChat(conversation)}>

                                    <Avatar
                                        src={member.imgUrl ? `https://res.cloudinary.com/mudarra/image/upload/v1631925154/${member.imgUrl}` : './img/header.png'}
                                    />
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
                        }) : <p>{i18n.no_chats}</p>
                ) :
                    <ListSkeleton />
                }
            </List>
        </div >
    );
}
