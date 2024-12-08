'use server'
import Gallery from "@/components/gallery";
import { connectionDB } from "@/libs/connectionDB";
import { AdModel } from "@/models/Ad";

type Props = {
    params: {
        id: string;
    };
    searchParams: { [key: string]: string };
};

export default async function SingleAdPage({ params }: Props) {
    await connectionDB();
    const adDoc = await AdModel.findById(params.id);
    if (!adDoc) return <div className="text-center text-gray-600 mt-10">Ad not found</div>;

    return (
        <div className="flex mx-40 pt-20 gap-10 scale-110">

            <div className="lg:w-3/5 w-full">
                <Gallery files={adDoc.files} />
            </div>

            <div className="lg:w-2/5 w-full h-[500px]">
                <h1 className="text-5xl font-bold mb-4">{adDoc.title}</h1>

                <div className="font-semibold px-1 bg-red-400 rounded-full w-32 flex items-center justify-center mb-5">{adDoc.category}
                </div>

                <div className="font-bold text-3xl mb-12">
                    <span>$</span>{adDoc.price}<span></span>
                </div>

                <div>
                    <label>Description</label>
                    <div className="text-gray-500 font-semibold mb-12">{adDoc.description}
                    </div>
                </div>

                <div>
                    <label>Contact</label>
                    <div className="text-gray-500 font-semibold mb-12">mobile:{adDoc.contact}</div>
                </div>
            </div>
        </div>
    )
}
