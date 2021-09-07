import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import Styles from '../../styles/senbazuru.module.css';
import useAuth from '../../src/auth/useAuth';
import i18nContext from '../../src/context/i18n';

export default function Chat({ refreshSendMessage, arrivalMessage }) {
    const { user, actualChat } = useAuth();
    const { i18n } = React.useContext(i18nContext);
    const messagesEndRef = React.useRef(null);
    const [searching, setSearching] = React.useState(true);
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("");
    const [sending, setSending] = React.useState(false);
    let lastSender = '';

    React.useEffect(() => {
        setMessages([]);
        setSearching(true);
        const getMessages = async () => {
            try {

                const res = await fetch(`/api/chat/${actualChat._id}`, {
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json"
                    },
                });

                const dataJson = await res.json();

                if (!dataJson.success) {
                    return
                }
                setMessages(dataJson.messages);
                setSearching(false);
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    }, [actualChat]);

    React.useEffect(() => {
        arrivalMessage && actualChat?.members.map(member => member._id).includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage]);

    }, [arrivalMessage, actualChat]);

    const evaluateLastSender = (sender) => {
        if (sender == lastSender) {
            return false
        }

        lastSender = sender;
        return true
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        setSending(true);

        refreshSendMessage(newMessage);

        try {
            const res = await fetch(`/api/chat/`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    conversation_id: actualChat._id,
                    sender_id: user._id,
                    text: newMessage
                })
            });

            const dataJson = await res.json();

            if (!dataJson.success) {
                return
            }

            setMessages([...messages, dataJson.newChat]);
            setNewMessage("");
            setSending(false);

        } catch (error) {
            console.log(error);
        }

    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    React.useEffect(scrollToBottom, [messages]);

    return (
        <>
            <div className={Styles.chatContainer}>

                {searching && <>
                    <Skeleton variant="text" width="30%" height={100} />
                    <Skeleton variant="text" width="30%" height={150} style={{ marginLeft: 'auto' }} />
                    <Skeleton variant="text" width="40%" height={100} style={{ marginLeft: 'auto' }} />
                </>}

                {messages ?
                    messages.map(message => {
                        let own = message.sender_id == user._id;

                        return (
                            <div
                                className={`${Styles.message} 
                            ${own ? Styles.messageRigth : Styles.messageLeft} 
                            ${evaluateLastSender(message.sender_id) && Styles.FirstMessage}`}
                            >
                                <Typography variant='subtitle1'>
                                    {message.text}
                                </Typography>
                                <div className={Styles.footerMessage}>
                                    <Typography variant='subtitle2' color="initial">
                                        {message.createdAt}
                                    </Typography>
                                </div>
                            </div>
                        )
                    }) :
                    <h1>NO hay mensajes mi king</h1>
                }


                <div ref={messagesEndRef} style={{ padding: 10 }} />
            </div>
            <Paper elevation={1} className={Styles.inputNewMessage}>
                <input
                    disbled={sending ? "true" : "false"}
                    type="text"
                    value={newMessage}
                    onChange={event => setNewMessage(event.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={i18n.write_message_here}
                />
            </Paper>
        </>
    )
}
