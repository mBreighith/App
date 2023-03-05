import React, { createContext, useContext, useState } from 'react';

type ListContextProps = {
    list: string[];
    setList: (list: string[]) => void;
};

const ListContext = createContext<ListContextProps>({
    list: [],
    setList: () => {},
});

export const useListContext = () => useContext(ListContext);

type ListProviderProps = {
    children: React.ReactNode;
};

export const ListProvider = ({ children }: ListProviderProps) => {
    //@ts-ignore
    const [list, setList] = useState<string[]>(['A', 'B', 'C']);

    return (
        <ListContext.Provider value={{ list, setList }}>
            {children}
        </ListContext.Provider>
    );
};
