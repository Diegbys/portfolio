import React from 'react';
import clsx from 'clsx';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import ContactMailIcon from '@material-ui/icons/ContactMail';


import i18nContext from '../context/i18n';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer({ transparent }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { i18n } = React.useContext(i18nContext);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false
            })}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <Link href="/" passHref>
                    <ListItem button>
                        <ListItemIcon> <HomeIcon /></ListItemIcon>
                        <ListItemText primary={i18n.title_home} />
                    </ListItem>
                </Link>
                <Link href="/contact" passHref>
                    <ListItem button>
                        <ListItemIcon> <ContactMailIcon /></ListItemIcon>
                        <ListItemText primary={i18n.title_contact} />
                    </ListItem>
                </Link>
                <Link href="/about" passHref>
                    <ListItem button>
                        <ListItemIcon> <InfoIcon /></ListItemIcon>
                        <ListItemText primary={i18n.title_about} />
                    </ListItem>
                </Link>
            </List>
            {/* <Divider /> */}
        </div>
    );

    return (
        <React.Fragment>
            <IconButton
                edge="start"
                className={(transparent ? 'transparent' : '') + ' menuApp'}
                color="inherit"
                aria-label="open drawer"
                onClickCapture={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </React.Fragment>
    );
}