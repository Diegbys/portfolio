import React from 'react';
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Button, Slide, IconButton, Menu, MenuItem, Fade } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';

import Styles from '../../styles/index.module.css';
import Logo from '../../public/img/logo.png';
import LogoWhite from '../../public/img/logo_white.png';
import ThemeContext from '../context/theme';
import i18nContext from '../context/i18n';
import ES from '../../public/img/es.svg';
import EN from '../../public/img/en.svg';
import TemporaryDrawer from '../components/drawer';

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({ target: undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function HideAppBar(props) {
    const [transparent, setTransparent] = React.useState(props.home);
    const [anchorEl, setAnchorEl] = React.useState(false);
    const { i18n, set, value } = React.useContext(i18nContext);

    React.useEffect(() => {
        if (props.home) {
            window.onscroll = () => setTransparent(window.pageYOffset === 0);
            return () => (window.onscroll = null);
        }
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (lenguage) => {
        setAnchorEl(null);
        if (lenguage) {
            set(lenguage);
        }
    };

    return (
        <ThemeContext.Consumer>
            {({ name, setTheme }) =>
                <React.Fragment>
                    <CssBaseline />
                    <HideOnScroll {...props}>
                        <AppBar
                            color={transparent ? 'transparent' : 'inherit'}
                            className={transparent ? 'no-box-shadow' : ''}
                        >
                            <Toolbar>
                                <div className={Styles.logoTitle}>
                                    <Image
                                        width={40}
                                        height={40}
                                        src={transparent ? LogoWhite : Logo}
                                        alt="Logo Image"
                                    />
                                </div>

                                <nav>
                                    <IconButton
                                        aria-label="delete"
                                        className={transparent ? 'transparent' : ''}
                                        onClick={() => setTheme(name == 'light' ? 'dark' : 'light')}
                                    >
                                        {name == 'light' ? <Brightness3Icon /> : <Brightness5Icon />}
                                    </IconButton>
                                    <Button
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                        className={transparent ? 'transparent' : ''}
                                    >
                                        <Image src={value == 'es' ? ES : EN} alt="icon language" width={20} height={20} />
                                        <span className={Styles.flags} >{value == 'es' ? 'es' : 'en'}</span>
                                    </Button>

                                    <Menu
                                        TransitionComponent={Fade}
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => handleClose(false)}
                                    >
                                        <MenuItem onClick={() => handleClose('es')}>
                                            <Image src={ES} alt="spanish lenguages" width={20} height={20} />
                                            <span className={Styles.flags} >ES</span>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleClose('en')}>
                                            <Image src={EN} alt="spanish lenguages" width={20} height={20} />
                                            <span className={Styles.flags} >EN</span>
                                        </MenuItem>
                                    </Menu>

                                    <Link href="/" passHref>
                                        <Button
                                            size="medium"
                                            className={(transparent ? 'transparent' : '') + ' hideMobile'}
                                        >
                                            {i18n.title_home}
                                        </Button>
                                    </Link>
                                    <Link href="/contact" passHref>
                                        <Button size="medium" className={(transparent ? 'transparent' : '') + ' hideMobile'}>
                                            {i18n.title_contact}
                                        </Button>
                                    </Link >
                                    <Button
                                        size="medium"
                                        className={(transparent ? 'transparent' : '') + ' hideMobile'}
                                    >
                                        {i18n.title_about}
                                    </Button>

                                    <TemporaryDrawer transparent={transparent} />
                                </nav>
                            </Toolbar>
                        </AppBar>
                    </HideOnScroll>
                    <Toolbar />
                </React.Fragment>
            }
        </ThemeContext.Consumer>
    );
}