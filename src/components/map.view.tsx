//React
import { useEffect, useState } from 'react'

//Components
import { MapContainer, TileLayer } from 'react-leaflet'

//Css
import 'leaflet/dist/leaflet.css'

//Interfaces
interface MapViewProps {
    coordinates: [number, number];
    zoom?: number;
    scrollWheelZoom?: boolean;
}

//Se crea este componente interno, porque si dejamos que cargue el Mapa como primera instancia, falla. Necesitamos confirmar que está montado para visualizarlo.
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

export default function MapView(props: MapViewProps) {
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
                    center={props.coordinates}
                    zoom={props.zoom}
                    scrollWheelZoom={props.scrollWheelZoom}
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