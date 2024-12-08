import { currentUser } from "@clerk/nextjs/server"
import ImageKit from "imagekit"

export const GET = async () => {
  const user = await currentUser()

  if (!user) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const ik = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT as string,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  })

  return new Response(JSON.stringify(ik.getAuthenticationParameters()))
}
