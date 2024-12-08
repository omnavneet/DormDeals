import { Ad } from "@/models/Ad";
import UploadThumbnail from "./UploadThumbnail";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function AdBlock({ad}:{ad: Ad}, index: number) {
  return (
    <div key={index} className="h-68 flex flex-col">

    {ad.files?.length > 0 && (

      <div
        className="rounded-md overflow-hidden">

        <UploadThumbnail
          onClick={() => redirect(`/ad/${ad._id}`)}
          file={ad.files[0]}
        />
      </div>
    )}

    <div className="font-bold text-xl mt-1">${ad.price}
    </div>

    <Link
      href={`/ad/${ad._id}`}
      className="font-semibold">{ad.title}
    </Link>

  </div>
  );
}