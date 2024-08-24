import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { fetchGeoDistribution } from '../services/api';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { City } from 'country-state-city';

const GeographicalDistributionMap = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchGeographicalData = async () => {
            const response = await fetchGeoDistribution();
            setLocations(response.data);
        };

        fetchGeographicalData();
    }, []);

    const getMarkerIcon = (count) => {
        const iconMarkup = renderToStaticMarkup(<MapPin color="green" size={24} />);
        const iconUrl = `data:image/svg+xml;base64,${btoa(iconMarkup)}`;

        return new L.Icon({
            iconUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });
    };

    const getCityCoordinates = (cityName) => {
        const cityData = City.getAllCities().find(city => city.name === cityName);
        if (cityData) {
            return [cityData.latitude, cityData.longitude];
        }
        return null;
    };

    return (
        <MapContainer center={[37.0902, -95.7129]} zoom={4} style={{ height: "600px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {locations.map((location) => {
                const position = getCityCoordinates(location._id);
                return (
                    position && (
                        <Marker key={location._id} position={position} icon={getMarkerIcon(location.count)}>
                            <Popup>
                                {location._id}: {location.count} customers
                            </Popup>
                        </Marker>
                    )
                );
            })}
        </MapContainer>
    );
};

export default GeographicalDistributionMap;