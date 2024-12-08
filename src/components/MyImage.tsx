'use client'
import Image, { ImageProps } from "next/image"

type LoaderProps = {
    src: string;
    width: number;
    quality?: number | undefined
}

const imageKitLoader = ({ src, width, quality }: LoaderProps) => {
    if (src[0] === "/") src = src.slice(1)
    const params = [`w-${width}`]
    if (quality) {
        params.push(`q-${quality}`)
    }
    const paramsString = params.join(",");
    var urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT as string
    if (urlEndpoint[urlEndpoint.length - 1] === "/") {
        urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
    }
    return `${urlEndpoint}/${src}?tr=${paramsString}`
}

const MyImage = (props: ImageProps) => {
    return (
        <Image
            loader={imageKitLoader}
            {...props}
        />
    )
}

export default MyImage
