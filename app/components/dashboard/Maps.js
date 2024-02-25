import { Map, useMap, Marker, AdvancedMarker } from '@vis.gl/react-google-maps';

import { useEffect, useContext, useState } from 'react';
import { CountryContext } from '@/app/context/CountryContext';
import markerStyles from '@/app/components/dashboard/Marker.module.css';

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

	const dummyMarkers = [
		{ lat: 33.137551, lng: -118.367706, date: '2024-02-01' }, // Pacific Ocean, near Los Angeles
		{ lat: 34.435622, lng: -76.479065, date: '2024-02-01' }, // Atlantic Ocean, near North Carolina
		{ lat: 26.263063, lng: -81.713918, date: '2024-02-01' }, // Gulf of Mexico, near Florida
		{ lat: 37.80617, lng: -122.465148, date: '2024-02-01' }, // Pacific Ocean, near San Francisco
		{ lat: 24.555595, lng: -82.677843, date: '2024-02-01' }, // Gulf of Mexico, near Florida Keys
		{ lat: 28.962666, lng: -80.501684, date: '2024-02-01' }, // Atlantic Ocean, near Cape Canaveral
		{ lat: 33.787914, lng: -78.97666, date: '2024-02-01' }, // Atlantic Ocean, near Myrtle Beach
		{ lat: 32.31245, lng: -64.726606, date: '2024-02-01' }, // Atlantic Ocean, near Bermuda
		{ lat: 24.838314, lng: -81.573429, date: '2024-02-01' }, // Gulf of Mexico, near Key West
		{ lat: 40.689247, lng: -70.4219, date: '2024-02-01' }, // Atlantic Ocean, near Long Island
		{ lat: 30.347393, lng: -81.394896, date: '2024-02-01' }, // Atlantic Ocean, near Jacksonville
		{ lat: 25.767699, lng: -80.190646, date: '2024-02-01' }, // Atlantic Ocean, near Miami
		{ lat: 32.67352, lng: -79.881156, date: '2024-02-01' }, // Atlantic Ocean, near Charleston
		{ lat: 33.893791, lng: -78.437821, date: '2024-02-01' }, // Atlantic Ocean, near Myrtle Beach
		{ lat: 41.267628, lng: -71.760928, date: '2024-02-01' }, // Atlantic Ocean, near Rhode Island
		{ lat: 34.032379, lng: -118.596469, date: '2024-02-01' }, // Pacific Ocean, near Santa Monica
		{ lat: 37.797695, lng: -122.432144, date: '2024-02-01' }, // Pacific Ocean, near San Francisco Bay
		{ lat: 25.761866, lng: -80.190732, date: '2024-02-01' }, // Atlantic Ocean, near Miami
		{ lat: 34.017201, lng: -118.496475, date: '2024-02-01' }, // Pacific Ocean, near Los Angeles
		{ lat: 33.577452, lng: -118.388815, date: '2024-02-01' }, // Pacific Ocean, near Long Beach
		{ lat: 32.655382, lng: -117.106525, date: '2024-02-01' }, // Pacific Ocean, near San Diego
		{ lat: 38.910119, lng: -123.024169, date: '2024-02-01' }, // Pacific Ocean, near Fort Bragg
		{ lat: 36.292253, lng: -120.266991, date: '2024-02-01' }, // Pacific Ocean, near Big Sur
		{ lat: 25.943434, lng: -81.710289, date: '2024-02-01' }, // Gulf of Mexico, near Florida Everglades
		{ lat: 32.826121, lng: -79.75417, date: '2024-02-01' }, // Atlantic Ocean, near Charleston
		{ lat: 24.550537, lng: -81.801792, date: '2024-02-01' }, // Gulf of Mexico, near Key West // Pacific Ocean, near Santa Barbara
		{ lat: 35.163846, lng: -75.477707, date: '2024-02-01' }, // Atlantic Ocean, near Cape Hatteras
		{ lat: 29.714274, lng: -84.999996, date: '2024-02-01' }, // Gulf of Mexico, near Florida Panhandle
		{ lat: 33.593384, lng: -78.525894, date: '2024-02-01' }, // Atlantic Ocean, near Myrtle Beach
		{ lat: 25.757725, lng: -80.201665, date: '2024-02-01' }, // Atlantic Ocean, near Miami
		{ lat: 34.390761, lng: -119.359749, date: '2024-02-01' }, // Pacific Ocean, near Santa Barbara
		{ lat: 37.784953, lng: -122.431562, date: '2024-02-01' }, // Pacific Ocean, near San Francisco
		{ lat: 30.277891, lng: -81.402689, date: '2024-02-01' }, // Atlantic Ocean, near Jacksonville
		{ lat: 34.019003, lng: -118.491331, date: '2024-02-01' }, // Pacific Ocean, near Los Angeles
		{ lat: 33.92204, lng: -118.41752, date: '2024-02-01' }, // Pacific Ocean, near Los Angeles
		{ lat: 29.993419, lng: -81.673637, date: '2024-02-01' }, // Atlantic Ocean, near St. Augustine
		{ lat: 24.555488, lng: -81.804688, date: '2024-02-01' }, // Gulf of Mexico, near Key West
		{ lat: 34.410252, lng: -119.687612, date: '2024-02-01' }, // Pacific Ocean, near Santa Barbara
		{ lat: 26.509605, lng: -82.093171 },
	];

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
			mapId="fbb5733c66435ab5"
		>
			{dummyMarkers.map((marker, index) => {
				return (
					<AdvancedMarker
						className={markerStyles.marker}
						key={index}
						position={{
							lat: marker.lat,
							lng: marker.lng,
						}}
					>
						<p>{marker.date}</p>
					</AdvancedMarker>
				);
			})}
		</Map>
	);
}
