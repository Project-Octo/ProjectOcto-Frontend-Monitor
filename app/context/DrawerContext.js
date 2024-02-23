import React, { createContext, useState } from 'react';

const DrawerContext = createContext();

const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export { DrawerContext, DrawerProvider };
