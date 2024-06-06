import React, {createContext, useState} from 'react';

const AppContext = createContext({
    sessionToken: '',
});

export default function AppProvider({children} : {
    children: React.ReactNode
}) {
    const [sessionToken, setSessionToken] = useState('');

    return (
        <AppContext.Provider value={{sessionToken: ''}}>
            {children}
        </AppContext.Provider>
    );
}