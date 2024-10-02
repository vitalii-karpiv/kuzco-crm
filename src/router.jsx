import {BrowserRouter, Route, Routes} from "react-router-dom";
import Laptops from "./pages/laptops.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Orders from "./pages/orders.jsx";
import MainMenu from "./components/main-menu.jsx";
import Login from "./pages/login.jsx";
import PrivateRoutes from "./utils/private-routes.jsx";
import OrderDetail from "./pages/order-detail.jsx";
import LaptopDetail from "./pages/laptop-detail.jsx";

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
                        <Route element={<LaptopDetail />} path={"laptops/laptopDetail/:id"} />
                        <Route element={<Orders/>} path={"/orders"} exact/>
                        <Route element={<OrderDetail />} path={"orders/orderDetail/:id"} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Router;
