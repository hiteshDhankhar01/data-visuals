import { Home } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import Sales from "../Pages/Sales";
import Dashboard from "../Pages/Dashboard";
import Orders from "../Pages/Orders";
import Customer from "../Pages/Customer";


const Router = () => {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/customers" element={<Customer />} />
            </Routes>
        </div>
    )
}

export default Router;
