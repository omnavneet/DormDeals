import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Header() {

    const { userId } = await auth()

    return (
        <header className="flex justify-between p-4 items-center h-28 border-b-2 border-black">

            <Link
                href="/"
                className="text-6xl z-2"> DormDeals
            </Link>

            <nav className="flex gap-3 font-semibold text-white ">

                <Link href="/newAd" className="border-2 border-[#4CAF50] bg-[#4CAF50] text-white duration-200 px-6 py-3 rounded-sm font-bold inline-flex text-lg items-center gap-2 hover:bg-white hover:text-[#4CAF50] hover:shadow-md hover:scale-105">
                    <FontAwesomeIcon icon={faPlus} className="h-4" />
                    <span>Post an ad!</span>
                </Link>
                <span className="border-r"></span>

                <div className="flex items-center justify-center mr-4">
                    {userId ?
                        <div className="flex gap-2">
                            <Link
                                href='/my-ads'
                                className="border-2 border-[#007BFF] bg-[#007BFF] text-white duration-200 px-6 py-3 rounded-sm font-bold inline-flex text-lg items-center gap-2 hover:bg-white hover:text-[#007BFF] hover:shadow-md hover:scale-105 mr-2">
                                Your Ads!
                            </Link>
                            <div className="scale-125 flex items-center justify-center px-2"> <UserButton /> </div>
                        </div>
                        :
                        <div className="flex gap-2">
                            <Link href={'/sign-in'}><button className="border-2 border-[#007BFF] bg-[#007BFF] text-white duration-200 px-6 py-3 rounded-sm font-bold inline-flex text-lg items-center gap-2 hover:bg-white hover:text-[#007BFF] hover:shadow-md hover:scale-105 ml-6 mr-2">Sign In</button>
                            </Link>

                            <Link href={'/sign-up'}><button className="border-2 border-[#007BFF] bg-[#007BFF] text-white duration-200 px-6 py-3 rounded-sm font-bold inline-flex text-lg items-center gap-2 hover:bg-white hover:text-[#007BFF] hover:shadow-md hover:scale-105 mr-2">Sign Up</button>
                            </Link>
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}
