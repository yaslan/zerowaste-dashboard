import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import toast from 'react-hot-toast'

export default function LeafletMap({ markers }) {
    return (
        <MapContainer
            center={[41.2867, 36.3300]} // Samsun İlkadım
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%', minHeight: '400px' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {markers.map((marker, i) => (
                <CircleMarker
                    key={i}
                    center={[marker.lat, marker.lng]}
                    radius={marker.radius}
                    pathOptions={{
                        color: marker.color,
                        fillColor: marker.color,
                        fillOpacity: 0.35,
                        weight: 2,
                    }}
                    eventHandlers={{
                        click: () => toast.success(`${marker.label}: ${marker.weight} kg collected`),
                    }}
                >
                    <Popup>
                        <div style={{ color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
                            <strong>{marker.label}</strong><br />
                            Density: <span style={{ color: marker.color, fontWeight: 'bold' }}>{marker.density}</span><br />
                            Weight: {marker.weight} kg
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    )
}
