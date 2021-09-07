import React from 'react';
import { Typography, Divider, IconButton, Tabs, Tab, Badge } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import useAuth from '../../../src/auth/useAuth';
import TabPanelFriends from './tabPanelFriends';
import TabPanelAddFriends from './tabPanelAddFriends';
import TabPanelFriendRequests from './tabPanelFriendRequests';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function AllUsersDrawer({ setOpenAllUsers }) {
    const [value, setValue] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const { user } = useAuth();
    const [friends, setFriends] = React.useState([]);
    const [friendRequests, setFriendRequests] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        getAllFriendRequests();
    }, []);

    const getAllFriendRequests = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user/getAllFriendRequests`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: user._id
                })
            });

            const dataJson = await res.json();

            setFriendRequests(dataJson.friendsRequests);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(async () => {
        getAllFriends();
    }, [friendRequests]);

    const getAllFriends = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user/getAllFriends`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: user._id
                })
            });

            const dataJson = await res.json();
            setFriends(dataJson.friends);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getUsers();
    }, [friends]);

    const getUsers = async () => {
        try {
            const res = await fetch(`/api/user/getAllUsers`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json"
                }
            });

            const dataJson = await res.json();
            let fr = friendRequests.map(e => e._id);
            setUsers(dataJson.users.filter(e => !friends.map(e => e._id).includes(e._id) && e._id != user._id && !fr.includes(e._id)));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <IconButton
                color="inherit"
                aria-label="Add friends"
                onClick={() => setOpenAllUsers(false)}
            >
                <ArrowBackIcon />
            </IconButton>

            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab
                    label="Friends"
                    icon={<Badge badgeContent={0} color="primary"> <GroupAddIcon /></Badge>}
                    {...a11yProps(0)}
                />
                <Tab
                    label="Add friends"
                    icon={<Badge badgeContent={0} color="primary"> <GroupAddIcon /></Badge>}
                    {...a11yProps(1)}
                />
                <Tab
                    label="Friend requests"
                    icon={<Badge badgeContent={friendRequests.length} color="primary"> <PersonAddIcon /></Badge>}
                    {...a11yProps(2)}
                />
            </Tabs>

            <Divider />

            <TabPanel value={value} index={0}>
                <TabPanelFriends
                    friends={friends}
                    setFriends={setFriends}
                    loading={loading}
                    setOpenAllUsers={setOpenAllUsers}
                />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <TabPanelAddFriends
                    friends={friends}
                    user={user}
                    users={users}
                    setUsers={setUsers}
                />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <TabPanelFriendRequests
                    friendRequests={friendRequests}
                    setFriendRequests={setFriendRequests}
                    loading={loading}
                    user={user}
                />
            </TabPanel>

        </div >
    );
}
