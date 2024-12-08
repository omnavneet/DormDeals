import { Loader } from "@googlemaps/js-api-loader"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

type Location = {
    lat: number
    lng: number
}

export default function LocationPicker({
    location,
    setLocation,
}: {
    location: Location
    setLocation: Dispatch<SetStateAction<Location>>
}) {
    const [map, setMap] = useState<any>()
    const [pin, setPin] = useState<any>()
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let listener: google.maps.MapsEventListener;

        async function loadMap() {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
            })
            const { Map } = await loader.importLibrary("maps")
            const { AdvancedMarkerElement } = await loader.importLibrary("marker")
            const map = new Map(divRef.current as HTMLDivElement, {
                mapId: "map",
                center: location,
                zoom: 12,
                mapTypeControl: false,
                streetViewControl: false,
            })
            setMap(map)

            const pin = new AdvancedMarkerElement({
                map,
                position: location,
            })
            setPin(pin)

            listener = map.addListener("click", (ev) => {
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                pin.position = { lat, lng }
                setLocation({ lat, lng })
            })
        }

        loadMap()

        return () => {
            if (listener) google.maps.event.removeListener(listener)
        }
    }, [])

    useEffect(() => {
        if (map && pin) {
            map.setCenter(location)
            pin.position = location
        }
    }, [location])

    return <div ref={divRef} className="h-96 w-full"></div>
}
