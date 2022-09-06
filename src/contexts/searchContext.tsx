import { createContext, useState } from 'react';
// import { UserResponse } from '../shared/models/user';

interface ISearchContext {
    searchText: string;
    setSearchText: (searchText: string) => void;
}

const SearchContext = createContext<ISearchContext | null>(null);

const SearchProvider = ({ children }: any) => {
    const [searchText, setSearchText] = useState<string>('');

    const value = {
        searchText,
        setSearchText,
    };

    return <SearchContext.Provider value={value as ISearchContext}>{children}</SearchContext.Provider>;
};

export { SearchContext, SearchProvider };