import { cn } from "@/lib/utils";
import { CompassIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "../../../public/rc.png";

export default function Navbar({ pageCallback }: { pageCallback: (page: string) => void }) {
    const pages = ["Explore", "Profiling", "Clash"]
    const [selectedPage, setSelectedPage] = useState(pages[0])
    useEffect(() => {
        pageCallback(selectedPage)
    }, [selectedPage])

    return (
        <div className="flex h-16 bg-[#151714] flex-row gap-12 justify-around items-center p-4 relative">
            <div onClick={() => setSelectedPage(pages[0])} className={cn("flex flex-col gap-1 items-center", selectedPage === "Explore" ? "" : "text-gray-400")}>
                <div>
                    <CompassIcon />
                </div>
                <p className="text-xs">Explore</p>
            </div>
            <div onClick={() => setSelectedPage(pages[1])} className={cn("flex flex-col gap-1 items-center", selectedPage === "Profiling" ? "" : "text-gray-400")}>
                <div>
                    <UserIcon />
                </div>
                <p className="text-xs">Profiling</p>
            </div>
            <div className="absolute bottom-5 justify-center items-center" >
                <img onClick={() => setSelectedPage(pages[2])} className="cursor-pointer" src={Image} />
             </div>

        </div>
    )
}