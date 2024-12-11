'use client'
import AdForm from "@/components/AdForm"

const locationDefault = {
    lat: 22.253060786873554,
    lng: 84.908268749718,
}

export default function NewAd() {

    return (
        <AdForm defaultLocation={locationDefault} />
    )
}