import { Map, useMap } from '@vis.gl/react-google-maps';

import { useEffect, useContext, useState } from 'react';
import { CountryContext } from '@/app/context/CountryContext';

export default function Maps() {
	const map = useMap();
	const { country } = useContext(CountryContext);
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);

	useEffect(() => {
		if (!map) return;
		if (country) {
			setLat(country.coordinates.location.lat);
			setLng(country.coordinates.location.lng);
			map.fitBounds(country.coordinates.viewport);
		}
	}, [country, map]);

	return (
		<Map
			zoom={3}
			center={
				lat && lng
					? {
							lat: lat,
							lng: lng,
					  }
					: {
							lat: 0,
							lng: 0,
					  }
			}
			gestureHandling={'greedy'}
			disableDefaultUI={true}
			style={{ width: '100vw', height: '100vh' }}
			zoomControl={true}
		/>
	);
}
