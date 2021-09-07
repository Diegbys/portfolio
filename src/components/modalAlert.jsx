import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


export default function ModalAlert({ setOpenDialog, openDialog, dialog }) {
    const theme = useTheme();

    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <DialogTitle>{dialog.title}</DialogTitle>
                {dialog.error ?
                    <CancelIcon style={{ color: theme.palette.error.main }} /> :
                    <CheckCircleIcon style={{ color: theme.palette.success.main }} />
                }
            </div>

            <DialogContent>
                <DialogContentText>{dialog.description}</DialogContentText>
            </DialogContent>
        </Dialog>
    );
}