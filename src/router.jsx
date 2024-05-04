import {BrowserRouter, Route, Routes} from "react-router-dom";
import Laptops from "./pages/laptops.jsx";
import Suppliers from "./pages/suppliers.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Orders from "./pages/orders.jsx";
import MainMenu from "./components/main-menu.jsx";
import Login from "./pages/login.jsx";
import PrivateRoutes from "./utils/private-routes.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <div className={"flex p-2"}>
                <MainMenu/>
                <Routes>
                    <Route element={<Login/>} path={"/login"} exact/>
                    <Route element={<PrivateRoutes/>}>
                        <Route element={<Dashboard/>} path={"/dashboard"} exact/>
                        <Route element={<Laptops/>} path={"/laptops"} exact/>
                        <Route element={<Orders/>} path={"/orders"} exact/>
                        <Route element={<Suppliers/>} path={"/suppliers"} exact/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Router;
