import React, { createContext, useState } from 'react';

// Create the country context
export const CountrySpecies = createContext();

// Create the country provider component
export const CountrySpeciesProvider = ({ children }) => {
	// State to hold the current country
	const [countrySpecies, setCountrySpecies] = useState('');

	// Function to update the country
	const updateCountrySpecies = (newData) => {
		setCountrySpecies(newData);
	};

	// Value object to be passed to consumers
	const value = {
		countrySpecies,
		updateCountrySpecies,
	};

	// Render the provider with the provided children
	return (
		<CountrySpecies.Provider value={value}>{children}</CountrySpecies.Provider>
	);
};
