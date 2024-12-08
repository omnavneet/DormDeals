import { UploadResponse } from "imagekit/dist/libs/interfaces";
import MyImage from "./MyImage";

type Props = {
   file: UploadResponse
   onClick: () => void
}

export default function UploadThumbnail({ file, onClick }: Props) {

   function handleClick(ev: React.MouseEvent) {
      if (onClick) {
         ev.preventDefault()
         return onClick()
      }
      location.href = file.url
   }
   if (file.fileType === "image") {
      return (
         <a onClick={handleClick} target="_blank">
            <MyImage
               alt={"product thumbnail"}
               src={file.filePath + '?tr=w-200,h-200,fo-auto'} className="rounded-lg"
               width={200}
               height={200}
            />
         </a>
      )
   }
   return (
      <div>{file.url}</div>
   )
}