import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';

import Styles from '../../styles/senbazuru.module.css';
import useAuth from '../../src/auth/useAuth';
import i18nContext from '../../src/context/i18n';

export default function ChatBox({ messages }) {
    const { user, actualChat, setConversations, conversations, getConversations } = useAuth();
    const messagesEndRef = React.useRef(null);
    const [searching, setSearching] = React.useState(true);
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("");
    let lastSender = '';
    let changeDate = true;

    const evaluateLastSender = (sender) => {
        if (sender == lastSender) {
            return false
        }

        lastSender = sender;
        return true
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    React.useEffect(scrollToBottom, [messages]);

    return (
        <div className={Styles.chatContainer}>

            {searching && <>
                <Skeleton variant="text" width="30%" height={100} />
                <Skeleton variant="text" width="30%" height={150} style={{ marginLeft: 'auto' }} />
                <Skeleton variant="text" width="40%" height={100} style={{ marginLeft: 'auto' }} />
            </>}

            {messages ?
                messages.map(message => {
                    let own = message.sender_id == user._id;
                    moment.locale('es');
                    console.log(moment(message.createdAt).day());

                    const date = (<div>
                        Hoy
                    </div>);

                    return (
                        <>
                            {date}
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
                                        {moment(message.createdAt).format('h:mm:ss a')}
                                    </Typography>
                                </div>
                            </div>
                        </>
                    )
                }) :
                <h1>NO hay mensajes mi king</h1>
            }

            <div ref={messagesEndRef} style={{ padding: 10 }} />

        </div>
    )
}
