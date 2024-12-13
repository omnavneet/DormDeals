import { Loader } from "@googlemaps/js-api-loader"
import React, { useEffect, useRef, useState } from "react"


type Location = {
    lat: number
    lng: number
}

const DistancePicker = ({
    onChange,
    defaultRadius,
}:
    {
        onChange: ({ radius, center }: { radius: number, center: Location }) => void
        defaultRadius: number

    }) => {
    const mapDiv = useRef<HTMLDivElement>(null)
    const [radius, setRadius] = useState(defaultRadius)
    const [center, setCenter] = useState<Location | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getUserLocation()
    }, [])

    async function getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
                loadMap({ lat: position.coords.latitude, lng: position.coords.longitude })
                setError(null)
            },
            (err) => {
                if (err.code === err.PERMISSION_DENIED) {
                    setError("Geolocation access denied.")
                } else {
                    setError("Failed to retrieve location.")
                }
            }
        )
    }

    useEffect(() => {
        if (center && radius) {
            onChange({ center, radius })
        }
    }, [radius, center])

    async function loadMap(initialCenter: { lat: number; lng: number }) {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        })

        const Core = await loader.importLibrary("core")
        const { Map, Circle } = await loader.importLibrary("maps")

        const map = new Map(mapDiv.current as HTMLDivElement, {
            mapId: "map",
            center: initialCenter,
            zoom: 11,
            mapTypeControl: false,
            streetViewControl: false,
        })

        const circle = new Circle({
            map,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            center: initialCenter,
            radius,
            editable: true,
        })

        Core.event.addListener(circle, "bounds_changed", () => {
            const radius = circle.getRadius()
            setRadius(radius)
            if (radius >= 3000000) map.setZoom(1)
            else if (radius >= 2000000) map.setZoom(2)
            else if (radius >= 1000000) map.setZoom(3)
            else if (radius >= 500000) map.setZoom(4)
            else if (radius >= 250000) map.setZoom(5)
            else if (radius >= 100000) map.setZoom(6)
            else if (radius >= 70000) map.setZoom(7)
            else if (radius >= 35000) map.setZoom(8)
            else if (radius >= 15000) map.setZoom(9)
            else if (radius >= 8000) map.setZoom(10)
        })

        Core.event.addListener(circle, "center_changed", () => {
            const newCenter = circle.getCenter()
            if (newCenter) {
                setCenter({ lat: newCenter.lat(), lng: newCenter.lng() })
                map.setCenter(newCenter)
            }
        })
    }

    return (
        <>
            <label>Location</label>
            <div ref={mapDiv} id="distance" className="size-12 w-full h-64 border-2 border-black">
                {error && (
                    <div className="text-gray-400 text-2xl p-5">{error}</div>
                )}
            </div>
        </>
    )
}

export default DistancePicker
