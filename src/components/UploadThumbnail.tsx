import { UploadResponse } from "imagekit/dist/libs/interfaces";
import MyImage from "./MyImage";

type Props = {
   file: UploadResponse;
   onClick: () => void;
};

export default function UploadThumbnail({ file, onClick }: Props) {
   function handleClick(ev: React.MouseEvent) {
      if (onClick) {
         ev.preventDefault();
         return onClick();
      }
      location.href = file.url;
   }

   if (file.fileType === "image") {
      return (
         <a onClick={handleClick} target="_blank">
            <MyImage
               placeholder="empty"
               priority={false}
               alt={"product thumbnail"}
               src={file.filePath + '?tr=w-250,h-300,fo-auto'} 
               className="rounded-sm bg-red-50"
               width={250}
               height={300}
            />
         </a>
      );
   }

   return <div>{file.url}</div>;
}
