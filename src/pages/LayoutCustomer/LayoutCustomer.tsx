import { Route, Routes, useLocation } from 'react-router-dom';
import NavbarCustomer from '../../components/NavbarCustomer/NavbarCustomer';
import Catalog from '../Catalog/Catalog';
import HomePage from '../HomePage/HomePage';
import ProductPage from '../ProductPage/ProductPage';

const LayoutCustomer = () => {
    const url = useLocation()
    return (
        <div>
            {url.pathname === '/' ? <NavbarCustomer /> : <NavbarCustomer bg_color='blue' />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
        </div>
    );
};

export default LayoutCustomer;
