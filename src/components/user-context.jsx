import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserService from "../api/services/user-service.js";
import Loading from "./loading.jsx";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([loadMe(), loadUsers()]);
    setLoading(false);
  };

  const loadMe = async () => {
    try {
      const me = await UserService.whoami();
      setMe(me);
    } catch (err) {
      console.error("Failed to load myself:", err);
    }
  };

  const loadUsers = async () => {
    try {
      const userList = await UserService.list({});
      setUsers(userList);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return <UserContext.Provider value={{ users, me }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used inside UserProvider");
  }
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
