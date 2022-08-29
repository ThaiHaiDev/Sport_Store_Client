import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import CustomersLayout from '../pages/Customers/CustomersLayout';

const RoutesCustom = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersLayout />} />
        </Routes>
    );
};

export default RoutesCustom;
