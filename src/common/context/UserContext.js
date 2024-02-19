import { useState, createContext, useContext, useEffect } from "react";

// Create the context with an initial value
export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [driversCount, setDriversCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [totalDeliveries, setTotalDeliveries] = useState(0);

    useEffect(() => {
    }, []);

    const ctxValue = {
        user,
        setUser,
        loading,
        setLoading,
        driversCount,
        setDriversCount,
        clientsCount,
        setClientsCount,
        totalDeliveries,
        setTotalDeliveries
    };

    return (
        <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
    );
};
