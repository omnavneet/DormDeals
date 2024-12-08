import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Header() {

    const { userId } = await auth()

    return (
        <header className="flex justify-between p-4 items-center h-20">

            <Link
                href="/"
                className="text-red-500 text-3xl font-bold"> DormDeals
            </Link>

            <nav className="flex gap-3 font-semibold text-white ">

                <Link href="/newAd" className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out font-semibold inline-flex text-lg items-center gap-2">
                    <FontAwesomeIcon icon={faPlus} className="h-4"/>
                    <span>Post an ad!</span>
                </Link>
                <span className="border-r"></span>

                <div>
                    {userId ?
                        <div> <UserButton /> </div>
                        :
                        <div className="flex gap-2">
                            <Link href={'/sign-in'}><button className="border-0 rounded-md bg-blue-600 px-3 py-1">Sign In</button>
                            </Link>

                            <Link href={'/sign-up'}><button className="border-0 rounded-md bg-blue-600 px-3 py-1">Sign Up</button>
                            </Link>
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}
