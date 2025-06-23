import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import UserService from "../api/services/user-service.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await UserService.list({});
                setUsers(userList);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load users:', err);
            }
        };

        loadUsers();
    }, []);

    if (loading) {
        return <h1>Loading users...</h1>;
    }

    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used inside UserProvider');
    }
    return context;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
