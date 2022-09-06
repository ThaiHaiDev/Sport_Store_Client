import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import CustomersLayout from '../pages/Customers/CustomersLayout';
import CategoryLayout from '../pages/Categories/CategoriesLayout';
import ProductLayout from '../pages/Products/ProductLayout';

const RoutesCustom = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersLayout />} />
            <Route path="/categories" element={<CategoryLayout />} />
            <Route path="/products" element={<ProductLayout />} />
        </Routes>
    );
};

export default RoutesCustom;
