import { createContext, useState } from 'react';
import { UserResponse } from '../share/models/user';
// import { CategoryResponse } from '../shared/models/category';

interface UserContextType {
    userList: UserResponse[] | [];
    setUserList: (userList: UserResponse[]) => void;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
    const [userList, setUserList] = useState<UserResponse[]>([]);

    const value = {
        userList,
        setUserList,
    };

    return <UserContext.Provider value={value as UserContextType}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };