import React from 'react';
import { Typography, Divider, IconButton, Avatar, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';
import { Image } from 'cloudinary-react';

import useAuth from '../../../src/auth/useAuth';
import Styles from '../../../styles/senbazuru.module.css';


export default function userConfiguration({ setUserConfiguration }) {
    const { user } = useAuth();
    const [imageSelected, setImageSelected] = React.useState("");

    const uploadImage = (files) => {

        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "jddi5ajv");

        Axios.post("https://api.cloudinary.com/v1_1/mudarra/image/upload", formData)
            .then(response => {
                console.log(response);
            })
    }

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

            <input type="file" onChange={event => setImageSelected(event.target.files[0])} />

            <Button onClick={uploadImage}>Upload Image</Button>

            

            <Avatar
                alt="User Image"
                src="https://res.cloudinary.com/mudarra/image/upload/v1631925154/ezezlwhk0jhdhd8kqslx.png"
                onClick={() => console.log('prueba')}
                className={Styles.avatarUser}
            />

            <Typography align="center" style={{ marginTop: 20 }} variant="h5">
                {user.firstName} {user.lastName}
            </Typography>

        </div >
    );
}
