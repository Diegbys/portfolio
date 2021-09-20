import React from 'react';
import { Typography, Divider, IconButton, Avatar, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';

import useAuth from '../../../src/auth/useAuth';
import Styles from '../../../styles/senbazuru.module.css';

export default function UserConfiguration({ setUserConfiguration }) {
    const { user, setLoading } = useAuth();

    const [imageSelected, setImageSelected] = React.useState("");
    const [actualImage, setActualImage] = React.useState(user?.imgUrl)
    const [showEditImage, setShowEditImage] = React.useState(false);

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
                    <Button onClick={uploadImage}>Upload Image</Button>
                </div>
            }

        </div >
    );
}
