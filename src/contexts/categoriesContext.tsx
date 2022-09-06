import { createContext, useState } from 'react';
import { CategoryResponse } from '../share/models/category';

interface CategoryContextType {
    categoryList: CategoryResponse[] | [];
    setCategoryList: (userList: CategoryResponse[]) => void;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

const CategoryProvider = ({ children }: any) => {
    const [categoryList, setCategoryList] = useState<CategoryResponse[]>([]);

    const value = {
        categoryList,
        setCategoryList,
    };

    return <CategoryContext.Provider value={value as CategoryContextType}>{children}</CategoryContext.Provider>;
};

export { CategoryContext, CategoryProvider };