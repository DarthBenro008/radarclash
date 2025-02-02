import Radar from "../..//assets//radarfind.png"
import RadarClashLogo from "../..//assets//rc_logo.svg"
import Internet from "../..//assets//internet.svg"
import RadarPeople from "../..//assets//radar_people.svg"
import { Card, CardContent } from "../ui/card"
import { useNavigate } from "react-router-dom"


export default function Clash() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col relative h-full w-full overflow-y-auto">
            <div className="-z-10 absolute top-0 w-full flex items-center justify-center">
                <img src={Radar} />
            </div>

            <div className="flex flex-col items-center justify-center pt-14">
                <img src={RadarClashLogo} />
            </div>

            <div className="flex flex-col items-center justify-center pt-14">
                <p className="text-xl text-white font-mono">Matchoff</p>
            </div>

            <div className="flex flex-col items-center justify-center pt-14 px-5">
                <Card onClick={() => navigate("/create-clash")} className="w-full">
                    <CardContent className="flex flex-col gap-2 justify-center items-center py-14">
                        <div>
                            <img src={Internet} />
                        </div>
                        <p className="text-xl">Discover LIVE Clashes</p>
                        <p className="text-sm text-gray-400">Instantly connect over a nearby clash</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col items-center justify-center pt-6 pb-4 px-5">
                <Card onClick={() => navigate("/create-clash")} className="w-full">
                    <CardContent className="flex flex-col gap-2 justify-center items-center py-14">
                        <div>
                            <img src={RadarPeople} />
                        </div>
                        <p className="text-xl">Create a nearby clash</p>
                        <p className="text-sm text-gray-400">Create a clash and invite your friends</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}