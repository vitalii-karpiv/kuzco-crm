import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import AuthManager from "../helpers/auth-manager";
import {UserProvider} from "../components/user-context.jsx";
import Loading from "../components/loading.jsx";

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
        return <Loading/>
    }

    return (
        isAuth ? <UserProvider><Outlet/></UserProvider> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;