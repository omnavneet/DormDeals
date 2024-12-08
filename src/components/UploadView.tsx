import { UploadResponse } from "imagekit/dist/libs/interfaces";
import MyImage from "./MyImage";

export default function UploadView({ file }: { file: UploadResponse }) {

    if (file.fileType === 'image') {
        return (
            <MyImage
                src={file.filePath}
                alt={"product url"}
                width={2048}
                height={2048}
                className="w-full h-auto max-h-full object-center rounded-lg"
            />
        )
    }
}