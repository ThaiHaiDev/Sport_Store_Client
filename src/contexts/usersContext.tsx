import { createContext, useState } from 'react';
// import { CategoryResponse } from '../shared/models/category';

interface UserContextType {
    userList: any;
    setUserList: (userList: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
    const [userList, setUserList] = useState<any>([]);

    const value = {
        userList,
        setUserList,
    };

    return <UserContext.Provider value={value as UserContextType}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };