import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import Styles from '../../../styles/senbazuru.module.css';

export default function ListSkeleton() {

    return (
        ['', '', '', '', '', ''].map((e, index) => (
            < ListItem key={index} button className={Styles.listItemUser}>
                <Skeleton variant="circle" width={50} height={50} />
                <ListItemText className={Styles.listTextUser}>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                </ListItemText>
            </ListItem>
        ))
    );
}
