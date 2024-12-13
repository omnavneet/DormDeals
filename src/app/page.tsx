'use client'
import { Ad } from "@/models/Ad"
import { useEffect, useRef, useState } from "react"
import { faBook, faMobile, faShirt, faStore } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SubmitButton from "@/components/SubmitButton"
import FilterPrice from "@/components/FilterPrice"
import DistancePicker from "@/components/DistancePicker"
import dynamic from "next/dynamic"

type Location = {
  lat: number
  lng: number
}

const AdBlock = dynamic(() => import("@/components/AdBlock"), { ssr: false })

export default function Home() {
  const [ads, setAds] = useState<Ad[] | null>(null)
  const [radius, setRadius] = useState(5000)
  const [center, setCenter] = useState<Location | null>(null)
  const [prevcenter, setPrevCenter] = useState<Location | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const categories = [
    { value: "books", label: "Books", icon: faBook },
    { value: "electronics", label: "Electronics", icon: faMobile },
    { value: "clothes", label: "Clothes", icon: faShirt },
  ]

  useEffect(() => {
    if (center === null) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }, [center])

  useEffect(() => {
    if (center && !prevcenter && radius) {
      formRef.current?.requestSubmit()
      setPrevCenter(center)
    }
  }, [center, prevcenter, radius])

  useEffect(() => {
    fetchAds()
  }, [])

  function fetchAds(params?: URLSearchParams) {

    if (!params) {
      params = new URLSearchParams()
    }
    if (!params.get('center')) {
      return
    }
    if (!params.has('radius')) {
      params.set('radius', Math.round(radius).toString())
    }
    if (!params.get('center')) {
      console.warn("Center not provided in search params.");
      return;
    }
    const url = params ? `/api/ads?${params.toString()}` : `/api/ads`;

    fetch(url)
      .then(async (response) => response.json())
      .then((adDocs) => setAds(adDocs))
      .catch((error) => console.error(error))
  }


  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const params = new URLSearchParams()

    formData.forEach((value, key) => {
      if (typeof value === 'string' && value.trim() !== '') {
        params.set(key, value)
      }
    })

    fetchAds(params)
  }

  return (
    <div className="flex w-full py-2">
      <form
        ref={formRef}
        onSubmit={handleSearch}
        className="w-1/5 p-4">

        <input type="text" name="phrase" placeholder="Search DormDeals" className="p-2 w-full text-lg border-[2px] border-black mb-8" />

        <div className="mb-8">

          <label
            className="radio-btn border-2 border-black">
            <input
              onClick={() => formRef.current?.requestSubmit()}
              className="hidden" type="radio" name="category" value="" defaultChecked />
            <span className="icon">
              <FontAwesomeIcon icon={faStore} />
            </span>
            All Categories
          </label>

          {categories.map((category) => {
            return (
              <label
                key={category.value}
                className="radio-btn border-2 border-black">
                <input
                  onClick={() => formRef.current?.requestSubmit()}
                  className="hidden" type="radio" name="category" value={category.value} />
                <span className="icon">
                  <FontAwesomeIcon icon={category.icon} />
                </span>
                {category.label}
              </label>
            )
          })}
        </div>

        <FilterPrice />

        <div className="my-5">
          <input type="hidden" name="radius" value={radius} />
          <input type="hidden" name="center" value={center?.lat + '-' + center?.lng} />
          <DistancePicker
            defaultRadius={5000}
            onChange={({ radius, center }) => {
              setRadius(radius)
              setCenter(center)
            }}
          />

        </div>

        <SubmitButton formRef={formRef} />
      </form>

      <div className="grow w-3/5">
        {/* <h2 className="font-bold text-3xl mb-4 mt-2">Latest Products</h2> */}
        <div className="grid grid-cols-4 justify-start gap-2">
          {ads && ads.map((ad) => (
            <AdBlock key={ad._id} ad={ad} />
          ))}
        </div>
        {ads && ads.length === 0 &&
          <div className="text-gray-500 font-bold text-2xl py-5">
            No Products found
          </div>
        }
        {ads === null && (
          <div className="text-gray-500 font-bold text-2xl py-5">Loading...</div>
        )}
      </div>
    </div>
  )
}
