import { createContext, useState } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import ModalAlert from '../../src/components/modalAlert';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [actualChat, setActualChat] = useState(null);

    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialog, setDialog] = useState({});

    const login = (userCredentials) => setUser(userCredentials);
    const logout = () => setUser(null);

    const isLogged = () => !!user;

    const getConversations = async () => {
        try {
            const res = await fetch(`/api/conversation/${user._id}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json"
                },
            });

            const dataJson = await res.json();

            if (!dataJson.success) {
                return
            }
            setConversations(dataJson.conversation);
        } catch (error) {
            console.log(error);
        }
    }

    const contextValue = {
        user,
        isLogged,
        login,
        logout,
        dialog,
        setDialog,
        setOpenDialog,
        loading,
        setLoading,
        conversations,
        setConversations,
        getConversations,
        actualChat,
        setActualChat
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}

            <Backdrop style={{ color: '#fff', zIndex: 999 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <ModalAlert setOpenDialog={setOpenDialog} openDialog={openDialog} dialog={dialog} />
        </AuthContext.Provider>
    );
}