import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import Ably from "ably/promises";

import Styles from '../../styles/senbazuru.module.css';
import useAuth from '../../src/auth/useAuth';
import ChatBox from './components/chatBox';
import i18nContext from '../../src/context/i18n';

const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' });

function useChannel(channelName, callbackOnMessage) {
    const channel = ably.channels.get(channelName);

    const onMount = () => {
        channel.subscribe(msg => { callbackOnMessage(msg); });
    }

    const onUnmount = () => {
        channel.unsubscribe();
    }

    const useEffectHook = () => {
        onMount();
        return () => { onUnmount(); };
    };

    useEffect(useEffectHook);

    return [channel, ably];
}

export default function Chat() {
    const { user, actualChat, setConversations, conversations, getConversations } = useAuth();
    const { i18n } = React.useContext(i18nContext);
    
    const [searching, setSearching] = React.useState(true);
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("");
    const [arrivalMessage, setArrivalMessage] = React.useState(null);
    const [sending, setSending] = React.useState(false);

    const [channel, ably] = useChannel("chat-demo", (socket) => {
        if (socket.data.receiverId != user._id) {
            return
        }

        setArrivalMessage({
            sender: socket.data.senderId,
            text: socket.data.text,
            createdAt: Date.now(),
            conversation_id: socket.data.conversation_id
        });
    });

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
        if (arrivalMessage && actualChat?.members.map(member => member._id).includes(arrivalMessage.sender)) {
            setMessages(prev => [...prev, arrivalMessage]);
        }
        getConversations();

    }, [arrivalMessage, actualChat]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        setSending(true);

        channel.publish({
            name: "chat-message",
            data: {
                senderId: user._id,
                receiverId: actualChat.members.find(member => member._id !== user._id)._id,
                text: newMessage,
                conversation_id: actualChat._id
            }
        });

        setNewMessage("");

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

            refreshLastMessage(dataJson.newChat);
            setMessages([...messages, dataJson.newChat]);
            setSending(false);
        } catch (error) {
            console.log(error);
        }

    }

    const refreshLastMessage = (lastMessage) => {
        let oldConv = conversations;
        setConversations("");
        oldConv[oldConv.findIndex(e => e._id == lastMessage.conversation_id)].lastMessage = lastMessage;
        setConversations(oldConv);
    }

    return (
        <>
            <ChatBox messages={messages} searching={searching} />

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
