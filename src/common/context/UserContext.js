import { useState, createContext, useContext, useEffect } from "react";

// Create the context with an initial value
export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, []);

    const ctxValue = {
        user,
        setUser,
        loading,
        setLoading
    };

    return (
        <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
    );
};
