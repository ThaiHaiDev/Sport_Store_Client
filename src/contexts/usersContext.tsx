import { createContext, useState } from 'react';
// import { CategoryResponse } from '../shared/models/category';

interface CategoryContext {
    categoryList: any;
    setCategoryList: (categoryList: any) => void;
}

const CategoryContext = createContext<CategoryContext | null>(null);

const CategoryProvider = ({ children }: any) => {
    const [categoryList, setCategoryList] = useState<any>([]);

    const value = {
        categoryList,
        setCategoryList,
    };

    return <CategoryContext.Provider value={value as CategoryContext}>{children}</CategoryContext.Provider>;
};

export { CategoryContext, CategoryProvider };