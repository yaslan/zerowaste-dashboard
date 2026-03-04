import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import toast from 'react-hot-toast'

// Fix Leaflet default icon paths (needed in Vite)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const activeIcon = new L.DivIcon({
    html: `<div style="width:14px;height:14px;background:#10b981;border:2px solid #fff;border-radius:50%;box-shadow:0 0 10px #10b981"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    className: ''
})

const pendingIcon = new L.DivIcon({
    html: `<div style="width:10px;height:10px;background:#7c3aed;border:2px solid #fff;border-radius:50%"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    className: ''
})

const routePoints = [
    [41.0082, 28.9784],
    [41.0250, 28.9850],
    [41.0370, 29.0090],
]

const stops = [
    { pos: [41.0082, 28.9784], label: '1248 Oakwood St.', status: 'active' },
    { pos: [41.0250, 28.9850], label: '902 Pine Avenue', status: 'pending' },
    { pos: [41.0370, 29.0090], label: 'Community Park A', status: 'pending' },
]

export default function CollectorRouteMap() {
    return (
        <MapContainer
            center={[41.022, 28.994]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Polyline positions={routePoints} color="#7c3aed" weight={3} dashArray="6 6" opacity={0.7} />
            {stops.map((s, i) => (
                <Marker
                    key={i}
                    position={s.pos}
                    icon={s.status === 'active' ? activeIcon : pendingIcon}
                    eventHandlers={{ click: () => toast.success(`Stop ${i + 1}: ${s.label}`) }}
                >
                    <Popup>
                        <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
                            <strong>Stop {i + 1}</strong><br />{s.label}<br />
                            <span style={{ color: s.status === 'active' ? '#10b981' : '#7c3aed', fontWeight: 'bold' }}>
                                {s.status === 'active' ? '● In Progress' : '○ Pending'}
                            </span>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
