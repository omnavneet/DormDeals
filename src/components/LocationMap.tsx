'use client'
import { Loader } from '@googlemaps/js-api-loader'
import React, { useEffect, useRef } from 'react'

type Props = {
    location: {
        lat: number
        lng: number
    }
}

const LocationMap = ({ location }: Props) => {

    const mapDivRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        loadMap()
    }, [])

    async function loadMap() {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        })
        const { Map } = await loader.importLibrary("maps")
        const { AdvancedMarkerElement } = await loader.importLibrary("marker")

        const map = new Map(mapDivRef.current as HTMLDivElement, {
            mapId: "map",
            center: location,
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            
        })

        new AdvancedMarkerElement({
            map,
            position: location,
        })
    }

    return (
        <div
            ref={mapDivRef}
            style={{
                width: '55%',
                height: '55%',
                borderRadius: '10px',
                overflow: 'hidden',
            }}
        ></div>
    )
}

export default LocationMap