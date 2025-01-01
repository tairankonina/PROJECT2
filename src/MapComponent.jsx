import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = ({ lat, lon }) => {

  // יצירת משתנה שמכיל את המיקום כמערך של [lat, lon]
  const position = [lat, lon];

  // אם ה- lat או ה- lon לא הוגדרו, לא מציגים את המפה
  if (lat === undefined || lon === undefined) {
    return <div>  </div>; // אם אין מיקום, מחזירים div ריק
  }

  return (
    <div style={{ height: '2700px', width: '100%' }}>
      {/* הצגת המפה ומרכז המפה נקבע על פי הקואורדינטות */}
      <MapContainer center={position} zoom={13} style={{ height: '100%' }}>
        {/* שימוש ב-TileLayer מ-OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {/* יצירת Marker על המפה עבור המיקום */}
        <Marker position={position} icon={new L.Icon.Default()}>
          {/* הצגת Popup עם פרטי המיקום */}
          <Popup>
            מיקום: {lat}, {lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
