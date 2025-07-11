import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router.jsx";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Montserrat, serif",
      },
    }}
  >
    <Router />
  </ConfigProvider>,
);
