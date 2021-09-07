import React from 'react';
import { AuthContext } from './authProvider';

export default function useAuth() {
    return React.useContext(AuthContext);
}
