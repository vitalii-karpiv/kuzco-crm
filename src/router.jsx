import {BrowserRouter, Route, Routes} from "react-router-dom";
import Laptops from "./pages/laptops.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Orders from "./pages/orders.jsx";
import MainMenu from "./components/main-menu.jsx";
import Login from "./pages/login.jsx";
import PrivateRoutes from "./utils/private-routes.jsx";
import OrderDetail from "./pages/order-detail.jsx";
import LaptopDetail from "./pages/laptop-detail.jsx";
import {Layout, Typography} from "antd";
import Sales from "./pages/sales.jsx";
import SaleDetail from "./pages/sale-detail.jsx";
import Finances from "./pages/finances.jsx";
import Inventory from "./pages/inventory.jsx";
import StockDetail from "./pages/stock-detail.jsx";
import Root from "./pages/root.jsx";

const { Header, Content, Footer, Sider } = Layout;

const Router = () => {

    return (
        <BrowserRouter>
            <Layout style={{ background: "#EEEEEE", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header style={{ display: 'flex', alignItems: 'center', background: "#6C7A89" }}>
                    <Typography.Title style={{marginBottom: "0px", color: "white"}} level={3}>KUZCO CRM 🤘</Typography.Title>
                </Header>
                <Content className={"flex"}>
                    <Layout
                        style={{
                            background: "#D2D7D3",
                            margin: 0,
                            flex: 1,
                        }}
                        className={"my-5 p-5"}
                    >
                        <Sider
                            width={200}
                            style={{
                                background: "#ffffff",
                                borderRadius: "10px",
                                overflow: "hidden",
                            }}
                        >
                            <MainMenu />
                        </Sider>
                        {/* --- Actual content --- */}
                        <Routes>
                            <Route element={<Root/>} path={"/"} exact/>
                            <Route element={<Login/>} path={"/login"} exact/>
                            <Route element={<PrivateRoutes/>}>
                                <Route element={<Dashboard/>} path={"/dashboard"} exact/>
                                <Route element={<Laptops/>} path={"/laptops"} exact/>
                                <Route element={<LaptopDetail />} path={"laptops/laptopDetail/:id"} />
                                <Route element={<Orders/>} path={"/orders"} exact/>
                                <Route element={<OrderDetail />} path={"orders/orderDetail/:id"} />
                                <Route element={<Sales/>} path={"/sales"} exact/>
                                <Route element={<SaleDetail />} path={"sales/saleDetail/:id"} />
                                <Route element={<Finances/>} path={"/finances"} exact/>
                                <Route element={<Inventory/>} path={"/inventory"} exact/>
                                <Route element={<StockDetail/>} path={"/inventory/stock/:id"} exact/>
                            </Route>
                        </Routes>
                        {/* --- Actual content --- */}
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center', background: "#EEEEEE" }}>
                    KUZCO CRM ©{new Date().getFullYear()} Created by Karpiv Vitalii
                </Footer>
            </Layout>
        </BrowserRouter>
    );
}

export default Router;
