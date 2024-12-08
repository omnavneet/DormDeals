'use client'
import { UploadResponse } from "imagekit/dist/libs/interfaces"
import UploadThumbnail from "./UploadThumbnail"
import UploadView from "./UploadView"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function Gallery({ files }: { files: UploadResponse[] }) {
    const [activeFile, setActiveFile] = useState<UploadResponse | null>(files?.[0] || null)

    function nextFile() {
        const activeFileIndex = files.findIndex(file => file === activeFile)
        const nextIndex = (activeFileIndex === files.length - 1) ? 0 : activeFileIndex + 1
        setActiveFile(files[nextIndex])
    }

    function prevFile() {
        const activeFileIndex = files.findIndex(file => file === activeFile)
        const prevIndex = (activeFileIndex === 0) ? files.length - 1 : activeFileIndex - 1
        setActiveFile(files[prevIndex])
    }

    return (
        <div className="flex flex-col items-center relative">

            {activeFile && (
                <>
                    <div className="w-auto h-[500px] flex items-center justify-center overflow-hidden">
                        <UploadView
                            file={activeFile}
                        />
                    </div>

                    <div className="absolute inset-4 flex items-center">
                        <div className="flex justify-between w-full">

                            <button
                                onClick={prevFile}
                                className="text-red-600 flex justify-center size-12 bg-gray-500/40
                            hover:bg-gray-500/70 rounded-full items-center transition">
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                />
                            </button>
                            <button
                                onClick={nextFile}
                                className="text-red-600 flex justify-center size-12 bg-gray-500/40
                            hover:bg-gray-500/70 rounded-full items-center transition">
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                />
                            </button>
                        </div>
                    </div>
                </>
            )}
            <div className="flex flex-wrap gap-2 mt-8">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="w-24 h-20 flex items-center justify-center border rounded z-10 cursor-pointer"
                    >
                        <UploadThumbnail
                            onClick={() => setActiveFile(file)}
                            file={file}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
