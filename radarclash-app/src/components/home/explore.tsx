import Avatar from "../..//assets//avatar.svg"
import OktoLogo from "../..//assets//okto.png"
import SolCoin from "../..//assets//solcoin.png"
import MapFrame from "../..//assets//map_frame.png"
import Trophy from "../..//assets//trophy.svg"
import Gem from "../..//assets//gem.svg"
import Winger from "../..//assets//winger.svg"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "../ui/badge"
import { CompassIcon, StarIcon } from "lucide-react"
import Challenges from "../profiling/challenges"

function AvatarCard() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-2">
                <img src={Avatar} />
                <p className="font-['Hepta_Slab'] text-xl text-white font-semibold">Solradar</p>
            </div>
            <div className="flex flex-row gap-4 pt-2">
                <div>
                    <Badge variant="secondary" className="flex flex-row gap-1 font-normal text-sm px-2 py-1"> <CompassIcon /> 10 mil region</Badge>
                </div>
                <div>
                    <Badge variant="outline" className="flex flex-row gap-1 font-normal text-sm px-2 py-1  text-[#dbdfd5]"> <StarIcon /> Level 2</Badge>
                </div>
            </div>
        </div>
    )
}


function LevelAndRanks() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row w-full justify-between">
                <div className="pl-6 text-white">
                    Level 2
                </div>
                <div className="pr-6 flex flex-row gap-1">
                    208xp
                    <p className="text-gray-400"> / 400xp</p>
                </div>
            </div>
            <div className="w-full pl-6 pr-6">
                <Progress value={66} />
            </div>
            <div className="flex flex-row justify-between">
                <div className="pl-6">
                    <p className="text-xs text-gray-400">Next Level</p>
                </div>
                <div className="pr-6">
                    <p className="text-xs text-gray-400">Level 3</p>
                </div>
            </div>

            <div className="flex flex-row justify-around pt-4 items-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-row gap-2">
                        <img src={Gem} />
                        <p className="text-white">208</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Total XP</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <img src={Winger} />
                        <p className="text-white">2.3k</p>
                    </div>
                    <div>
                        <p className="text-sm text-center text-gray-400">Sol Won</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <img src={Trophy} />
                        <p className="text-white">1,223</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Local Rank</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function OktoWallet() {
    return (
        <div className="p-6">
            <Card>
                <CardContent className="grid grid-cols-2 justify-center px-2 py-4">
                    <div className="flex flex-col h-full justify-center pl-2">
                        <p className="text-sm text-gray-400">Wallet Balance</p>
                        <div className="flex flex-row gap-2 pt-2">
                            <img src={SolCoin} className="w-6 h-6" />
                            <p className="text-xl">32 Sol</p>
                        </div>
                    </div>
                    <div className="flex flex-col h-full justify-center items-end pr-2">
                        <Button variant="secondary">Add funds</Button>
                        <div className="flex flex-row gap-2 items-center pt-2">
                            <p className="text-xs text-gray-400">Powered by Okto</p>
                            <img src={OktoLogo} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ChallengesHolder() {
    return (
        <div className="w-full">
            <Tabs defaultValue="challenges" className="w-full px-4">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="challenges">Challenges</TabsTrigger>
                    <TabsTrigger disabled className="w-full" value="leaderboard">Leaderboard</TabsTrigger>
                </TabsList>
                <TabsContent value="challenges">
                    <Challenges />
                </TabsContent>
                <TabsContent value="leaderboard">Leaderboard</TabsContent>
            </Tabs>
        </div>
    )
}

export default function Explore() {
    return (
        <div className="flex flex-col h-full w-full relative">
            <div className="-z-10 absolute top-0 w-full items-center flex justify-center">
                <img src={MapFrame} />
            </div>
            <div className="pt-12 pb-4">
                <AvatarCard />
            </div>
            <div className="pt-4 pb-2">
                <LevelAndRanks />
            </div>
            <div>
                <OktoWallet />
            </div>
            <div className="w-full">
                <ChallengesHolder />
            </div>
        </div>
    )
}