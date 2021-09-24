import React from 'react';
import { Typography, Divider, IconButton, Avatar, Button, Menu, MenuItem, Fade } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Image from 'next/image';

import useAuth from '../../../src/auth/useAuth';
import Styles from '../../../styles/senbazuru.module.css';
import i18nContext from '../../../src/context/i18n';
import ThemeContext from '../../../src/context/theme';
import ES from '../../../public/img/es.svg';
import EN from '../../../public/img/en.svg';

export default function UserConfiguration({ setUserConfiguration }) {
    const { user, setLoading } = useAuth();
    const { i18n, set, value } = React.useContext(i18nContext);
    const { name, setTheme } = React.useContext(ThemeContext);

    const [imageSelected, setImageSelected] = React.useState("");
    const [actualImage, setActualImage] = React.useState(user?.imgUrl)
    const [showEditImage, setShowEditImage] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(false);

    const uploadImage = async () => {

        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "jddi5ajv");

        setLoading(true);

        Axios.post("https://api.cloudinary.com/v1_1/mudarra/image/upload", formData)
            .then(async response => {
                console.log(response);
                setLoading(false);

                if (response.status != 200) {
                    alert("Error");
                    return;
                }

                setActualImage(response.data.public_id);

                const res = await fetch(`/api/user/uploadImage`, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        id: user._id,
                        imgUrl: response.data.public_id
                    })
                });

                const dataJson = await res.json();

                if (!dataJson.success) {
                    alert("Error");
                    return;
                }

            });
    }

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
        <div>
            <IconButton
                color="inherit"
                aria-label="Add friends"
                onClick={() => setUserConfiguration(false)}
            >
                <ArrowBackIcon />
            </IconButton>

            <Divider />

            <Avatar
                alt="User Image"
                src={`https://res.cloudinary.com/mudarra/image/upload/v1631925154/${actualImage}`}
                onClick={() => setShowEditImage(!showEditImage)}
                className={Styles.avatarUser}
            />

            <Typography align="center" style={{ marginTop: 20 }} variant="h5">
                {user?.firstName} {user?.lastName}
            </Typography>

            {showEditImage &&
                <div className={Styles.uploadContainer}>
                    <input type="file" onChange={event => setImageSelected(event.target.files[0])} />
                    <Button onClick={uploadImage}>{i18n.upload_image}</Button>
                </div>
            }

            <div className={Styles.themeLanguageContainer}>
                <IconButton
                    aria-label="delete"
                    onClick={() => setTheme(name == 'light' ? 'dark' : 'light')}
                >
                    {name == 'light' ? <Brightness3Icon /> : <Brightness5Icon />}
                </IconButton>

                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <Image src={value == 'es' ? ES : EN} alt="icon language" width={20} height={20} />
                    <span className={Styles.flags} >{value == 'es' ? 'es' : 'en'}</span>
                </Button>
            </div>

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
        </div >
    );
}
