import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, Hidden, } from '@material-ui/core';

import Styles from '../../styles/senbazuru.module.css';
import AllUsersDrawer from './components/allUsersDrawer';
import PrincipalDrawer from './components/principalDrawer';
import useAuth from '../../src/auth/useAuth';

// const useStylesAddFriend = makeStyles((theme) => ({
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// }));

export default function MenuLeft({ handleDrawerToggle, window, mobileOpen }) {
    const theme = useTheme();
    const [openAllUsers, setOpenAllUsers] = React.useState(false);
    const { getConversations } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const container = window !== undefined ? () => window().document.body : undefined;

    React.useEffect(async () => {
        setLoading(true);
        await getConversations();
        setLoading(false);
    }, [])

    const drawer = (
        <PrincipalDrawer loading={loading} setOpenAllUsers={setOpenAllUsers} />
    );

    return (
        <nav className={Styles.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{ paper: Styles.drawerPaper }}
                    ModalProps={{ keepMounted: true }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{ paper: Styles.drawerPaper }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={openAllUsers}
                onClose={() => setOpenAllUsers(false)}
                classes={{ paper: Styles.drawerPaper }}
                ModalProps={{ keepMounted: true }}
            >
                <AllUsersDrawer setOpenAllUsers={setOpenAllUsers} />
            </Drawer>
            {/* <Modal
                aria-labelledby="Add friends!"
                aria-describedby="You can add friends here"
                className={classesAddFriend.modal}
                open={openAddFriends}
                onClose={() => setOpenAddFriends(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openAddFriends}>
                    <Paper elevation={1}>
                        <h2>Transition modal</h2>
                        <p>react-transition-group animates me.</p>
                    </Paper>
                </Fade>
            </Modal> */}
        </nav >
    );
}
