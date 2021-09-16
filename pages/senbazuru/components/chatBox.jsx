import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';

import Styles from '../../../styles/senbazuru.module.css';
import useAuth from '../../../src/auth/useAuth';
import i18nContext from '../../../src/context/i18n';

export default function ChatBox({ messages, searching }) {
    const { user } = useAuth();
    const { i18n } = React.useContext(i18nContext);
    const messagesEndRef = React.useRef(null);
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

    const getDateIndicator = (date) => {
        let yesterday = moment().subtract(1, 'days');

        if (date.date() == moment().date() && date.month() == moment().month()) {
            return i18n.today;
        }

        if (date.date() == yesterday.date() && date.month() == yesterday.month()) {
            return i18n.yesterday;
        }

        return date.format('MM/DD/YYYY');
    }

    return (
        <div className={Styles.chatContainer}>

            {searching && <>
                <Skeleton variant="text" width="30%" height={100} />
                <Skeleton variant="text" width="30%" height={150} style={{ marginLeft: 'auto' }} />
                <Skeleton variant="text" width="40%" height={100} style={{ marginLeft: 'auto' }} />
            </>}

            {messages ?
                messages.map((message, messageIndex) => {

                    moment.locale('es');
                    let own = message.sender_id == user._id;
                    let a = moment(message.createdAt);
                    let b = messageIndex > 0 ? moment(messages[messageIndex - 1].createdAt) : a;
                    let date = '';

                    console.log(a.date(), b.date(), a.month(), b.month(), message.text);

                    if (a.date() > b.date() || a.month() > b.month()) {
                        changeDate = true;
                    }

                    if (changeDate) {
                        date = (<Paper className={Styles.dateIndicator} elevation={1}>
                            {getDateIndicator(a)}
                        </Paper>);

                        changeDate = false;
                        lastSender = '';
                    }

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
                                        {moment(message.createdAt).format('h:mm a')}
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
