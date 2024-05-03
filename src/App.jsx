import { Button } from "antd";
import Dashboard from "./pages/dashboard.jsx";
import Laptops from "./pages/laptops.jsx";
import Orders from "./pages/orders.jsx";
import Suppliers from "./pages/suppliers.jsx";

function App() {
  return (
      <div className={"flex"}>
          <h1 className="text-3xl font-bold underline bg-red-300">
              Hello world!
          </h1>
          <Button type="primary">Primary Button</Button>
          <Dashboard />
          <Laptops />
          <Orders />
          <Suppliers />
      </div>
  )
}

export default App
