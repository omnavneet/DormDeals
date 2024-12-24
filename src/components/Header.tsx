import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Header() {

    const { userId } = await auth()

    return (
        <header className="flex justify-between lg:p-4 p-2 items-center h-28 border-b-2 border-black">

            <Link
                href="/"
                className="lg:text-6xl z-2 text-4xl"> DormDeals
            </Link>

            <nav className="flex gap-3 font-semibold text-white">

                {userId ? <Link href="/newAd" className="border-2 border-[#4CAF50] bg-[#4CAF50] text-white duration-200 rounded-sm font-bold inline-flex text-lg items-center gap-2 hover:bg-white hover:text-[#4CAF50] hover:shadow-md hover:scale-105 lg:px-6 lg:py-3 ml-6 px-4 py-2">
                    <FontAwesomeIcon icon={faPlus} className="h-4" />
                    <span className="hidden lg:block md:block">Post an ad!</span>
                </Link> : null}



                <div className="flex items-center justify-center mr-4">
                    {userId ?
                        <div className="flex gap-2">
                            <Link
                                href='/my-ads'
                                className="border-2 border-[#007BFF] bg-[#007BFF] text-white duration-200rounded-sm font-bold inline-flex lg:text-lg md:text-lg text-sm items-center hover:bg-white hover:text-[#007BFF] hover:shadow-md hover:scale-105 lg:px-6 lg:py-3 px-4 py-2">
                                Your Ads!
                            </Link>
                            <div className="scale-125 flex items-center justify-center lg:px-2 md:px-2 pl-2 pr-0"> <UserButton /> </div>
                        </div>
                        :
                        <div className="flex gap-2">
                            <Link href={'/sign-in'}><button className="border-2 border-[#007BFF] bg-[#007BFF] text-white duration-200 rounded-sm font-bold inline-flex lg:text-lg md:text-lg text-sm items-center gap-2 hover:bg-white hover:text-[#007BFF] hover:shadow-md hover:scale-105 ml-6 mr-2 px-6 py-3">Sign In</button>
                            </Link>

                            <Link href={'/sign-up'}><button className="border-2 border-[#007BFF] bg-[#007BFF] text-white duration-200 rounded-sm font-bold inline-flex lg:text-lg md:text-lg text-sm items-center gap-2 hover:bg-white hover:text-[#007BFF] hover:shadow-md hover:scale-105 mr-2 px-6 py-3">Sign Up</button>
                            </Link>
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}
