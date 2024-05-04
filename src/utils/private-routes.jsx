import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import AuthManager from "../helpers/auth-manager";

const PrivateRoutes = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            await AuthManager.checkAuth();
            setIsAuth(AuthManager.isAuthorized);
            setIsLoading(AuthManager.isLoading);
        }
        checkAuth();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        isAuth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;