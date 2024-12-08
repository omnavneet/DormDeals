'use client'
import { Ad } from "@/models/Ad";
import { useEffect, useState } from "react";
import AdBlock from "@/components/AdBlock";

export default function Home() {

  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetch('/api/ads').then(res => {
      res.json().then(adDocs => {
        setAds(adDocs);
      });
    });
  }, []);

  function handleSearch(){

  }

  return (
    <div className="flex w-full">
      <form 
      action={handleSearch}
      className="grow w-1/4 p-4 border-r">

        <input 
        type="text" 
        placeholder="Search DormDeals">
        </input>
      </form>


      <div className="grow w-3/4 p-2 bg-red-50">
        <h2 className="font-bold text-3xl mb-4 mt-2">Latest Products</h2>
        <div className="grid grid-cols-4 gap-x-2 gap-y-8 justify-start">
          {ads.map(ad => (
            <AdBlock key={ad._id} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
}
