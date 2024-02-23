import React, { createContext, useState } from 'react';

// Create the country context
export const CountryContext = createContext();

// Create the country provider component
export const CountryProvider = ({ children }) => {
    // State to hold the current country
    const [country, setCountry] = useState('');

    // Function to update the country
    const updateCountry = (newCountry) => {
        setCountry(newCountry);
    };

    // Value object to be passed to consumers
    const value = {
        country,
        updateCountry,
    };

    // Render the provider with the provided children
    return (
        <CountryContext.Provider value={value}>
            {children}
        </CountryContext.Provider>
    );
};
