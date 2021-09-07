import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Fade, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Styles from '../../../styles/senbazuru.module.css';
import useAuth from '../../../src/auth/useAuth';

const drawerWidth = 401;

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export default function ChatUserBar({ user, handleDrawerToggle }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(false);
    const { getConversations, actualChat, setActualChat, conversations, setLoading } = useAuth();

    const deleteConversation = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/conversation/${actualChat._id}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json"
                },
            });

            const dataJson = await res.json();

            if (!dataJson.success) {
                return
            }

            console.log(dataJson);

            setAnchorEl(null)
            await getConversations();
            setActualChat(conversations.length > 1 ? conversations[0] : false);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    let actualChatUser = actualChat?.members.find(e => e._id != user._id);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Avatar alt="Remy Sharp" src='./img/header.png' />
                <Typography variant="h6" noWrap className={Styles.textAppBar}>
                    {actualChatUser.firstName} {actualChatUser.lastName}
                </Typography>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    edge="start"
                    onClick={event => setAnchorEl(event.currentTarget)}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    TransitionComponent={Fade}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    keepMounted
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => deleteConversation()}>
                        Eliminar conversación
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar >
    )
}
