import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapViewProps {
    coordinates: [number, number];
    zoom?: number;
    scrollWheelZoom?: boolean;
}

function ClientOnly({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return null
    }

    return <>{children}</>
}

export default function MapView({
    coordinates,
    zoom = 13,
    scrollWheelZoom = true
}: MapViewProps) {
    return (
        <div style={{ height: '600px', width: '100%' }}>
            <style>
                {`
                    .leaflet-container {
                        height: 100%;
                        width: 100%;
                    }
                `}
            </style>
            <ClientOnly>
                <MapContainer
                    center={coordinates}
                    zoom={zoom}
                    scrollWheelZoom={scrollWheelZoom}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </ClientOnly>
        </div>
    )
}