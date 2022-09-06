import { createContext, useState } from 'react';
import { ProductResponse } from '../share/models/product';

interface ProductContextType {
    productList: ProductResponse[] | [];
    setProductList: (userList: ProductResponse[]) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

const ProductProvider = ({ children }: any) => {
    const [productList, setProductList] = useState<ProductResponse[]>([]);

    const value = {
        productList,
        setProductList,
    };

    return <ProductContext.Provider value={value as ProductContextType}>{children}</ProductContext.Provider>;
};

export { ProductContext, ProductProvider };