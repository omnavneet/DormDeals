import { Ad } from "@/models/Ad";
import UploadThumbnail from "./UploadThumbnail";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function AdBlock({ ad }: { ad: Ad }, index: number) {
  return (
    <div
      key={index}
      className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      {ad.files?.length > 0 && (
        <div className="w-full h-auto flex justify-center overflow-hidden">
          <UploadThumbnail
            onClick={() => redirect(`/ad/${ad._id}`)}
            file={ad.files[0]}
          />
        </div>
      )}

      <div className="p-4 w-full">
        <div className="text-gray-800 font-bold text-lg">${ad.price}</div>
        <Link
          href={`/ad/${ad._id}`}
          className="text-gray-600 font-semibold"
        >
          {ad.title}
        </Link>
      </div>
    </div>
  );
}
