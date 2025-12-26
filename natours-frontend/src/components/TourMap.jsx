import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// Leaflet Default Icon Fix (React mein icon kabhi-kabhi gayab ho jata hai)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Map ko auto-zoom karne ke liye helper component
const ChangeView = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    if (locations && locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.coordinates[1], loc.coordinates[0]]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);
  return null;
};

const TourMap = ({ locations }) => {
  // Agar locations nahi hain, toh map mat dikhao
  if (!locations || locations.length === 0) return null;

  // Note: MongoDB mein coordinates [Long, Lat] hote hain, Leaflet ko [Lat, Long] chahiye.
  // Isliye hum coordinates[1] pehle aur coordinates[0] baad mein use kar rahe hain.

  return (
    <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-0 relative">
      <MapContainer 
        center={[locations[0].coordinates[1], locations[0].coordinates[0]]} 
        zoom={6} 
        scrollWheelZoom={true} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        
        <ChangeView locations={locations} />

        {locations.map((loc, index) => (
          <Marker 
            key={index} 
            position={[loc.coordinates[1], loc.coordinates[0]]}
          >
            <Popup className="text-black font-bold">
              Day {loc.day}: {loc.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TourMap;