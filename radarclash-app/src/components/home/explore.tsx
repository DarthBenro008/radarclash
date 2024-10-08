import Avatar from "../../../public/avatar.png"
import OktoLogo from "../../../public/okto.png"
import SolCoin from "../../../public/solcoin.png"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function AvatarCard() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <img src={Avatar} />
                <p>Solradar</p>
            </div>
            <div className="flex flex-row gap-4">
                <div>
                    badge 1
                </div>
                <div>
                    badge 2
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

function Challenges() {
    return (
        <div className="w-full">
            <Tabs defaultValue="challenges" className="w-full px-4">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="challenges">Challenges</TabsTrigger>
                    <TabsTrigger className="w-full" value="clash">Clash</TabsTrigger>
                </TabsList>
                <TabsContent value="challenges">
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                            <p className="text-xl">Challenges</p>
                            <p className="text-sm text-gray-400">View all</p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="leaderboard">Leaderboard</TabsContent>
            </Tabs>
        </div>
    )
}

export default function Explore() {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="pt-12 pb-4">
                <AvatarCard />
            </div>
            <div className="py-4">
                <LevelAndRanks />
            </div>
            <div>
                <OktoWallet />
            </div>
            <div className="w-full">
                <Challenges />
            </div>
        </div>
    )
}