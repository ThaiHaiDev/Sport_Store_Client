import { Route, Routes } from 'react-router-dom';
import Customers from '../pages/Customers/Customers';
import Dashboard from '../pages/Dashboard/Dashboard';

const RoutesCustom = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
        </Routes>
    );
};

export default RoutesCustom;
