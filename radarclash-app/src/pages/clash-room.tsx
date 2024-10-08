import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function Player({ name, level, image }: { name: string, level: number, image: string }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <img className="w-12 h-12" src={image} />
            <div className="pt-2 flex flex-col items-center justify-center">
                <p className="text-xl text-white">{name}</p>
                <p className="text-xs text-gray-400">Level {level}</p>
            </div>
        </div>
    )
}


export default function ClashRoom() {
    return (
        <div className="relative flex flex-col gap-2 pt-10 items-center h-screen w-full">
            <div className="flex flex-row gap-1 items-center">
                <img className="w-4 h-4" src="/avatar.svg" />
                <p className="text-xs text-gray-400">Benro</p>
            </div>
            <div>
                <Badge variant={"secondary"} className="px-4 text-md font-normal">Live</Badge>
            </div>
            <div className="pt-4 text-white text-xl">
                I have the highest ELO in the town!
            </div>
            <div className="w-full px-6">
                <Card className="w-full">
                    <CardContent className="w-full p-3">
                        <div className="flex flex-col gap-2">
                            <div className="flex-row gap-4 flex">
                                <img src="/chess.svg" />
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <p className="text-sm text-gray-300">Challenge Type</p>
                                        <p>Highest elo score in chess.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 pt-6 justify-around">
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-300">Entry Amount</p>
                                    <p className="text-xl text-primary">24 sol</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-300">Paricipants</p>
                                    <p className="text-xl text-primary">3/4</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="h-[400px] w-full flex flex-col items-center justify-center">
                <img src="/ring.svg" className="-z-10 absolute" />
                {/* <p className="text-white text-sm">2 Clashers</p> */}
                <div className="grid grid-cols-2 grid-rows-2 gap-10">
                    <Player name="Benro" level={23} image="/avatar.svg" />
                    <Player name="Benro" level={23} image="/avatar.svg" />
                    <Player name="Benro" level={23} image="/avatar.svg" />
                    <Player name="Benro" level={23} image="/avatar.svg" />
                </div>
            </div>

            <div className="absolute flex items-center gap-2 flex-col bottom-10 w-full">
                <div className="flex flex-row gap-2 text-white">
                    <p>Current Clash Amount: </p>
                    <img src="/solcoin.png" />
                    <p className="font-bold">24 sol</p>
                </div>
                <div className="px-5 w-full">
                    <div className="flex flex-row justify-around">
                        <Button variant={"destructive"} className="w-full bg-[#CE5555] bg-opacity-15 text-[#E87070]">
                            <p>
                                Leave Clash
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}