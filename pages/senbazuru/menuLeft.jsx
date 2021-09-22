import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, Hidden, } from '@material-ui/core';

import Styles from '../../styles/senbazuru.module.css';
import AllUsersDrawer from './components/allUsersDrawer';
import PrincipalDrawer from './components/principalDrawer';
import UserConfiguration from './components/userConfiguration';
import useAuth from '../../src/auth/useAuth';

export default function MenuLeft({ handleDrawerToggle, window, mobileOpen }) {
    const theme = useTheme();
    const [openAllUsers, setOpenAllUsers] = React.useState(false);
    const [openUserConfiguration, setUserConfiguration] = React.useState(false);
    const { getConversations } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const container = window !== undefined ? () => window().document.body : undefined;

    React.useEffect(() => {
        async function getConvs() {
            setLoading(true);
            await getConversations();
            setLoading(false);
        }
        getConvs();
    }, [])

    const drawer = (
        <PrincipalDrawer
            loading={loading}
            setOpenAllUsers={setOpenAllUsers}
            setUserConfiguration={setUserConfiguration}
            close={handleDrawerToggle}
        />
    );

    return (
        <nav className={Styles.drawer}>

            <Hidden mdUp implementation="css">
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

            <Hidden smDown implementation="css">
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
            
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={openUserConfiguration}
                onClose={() => setUserConfiguration(false)}
                classes={{ paper: Styles.drawerPaper }}
                ModalProps={{ keepMounted: true }}
            >
                <UserConfiguration setUserConfiguration={setUserConfiguration} />
            </Drawer>
        </nav >
    );
}
