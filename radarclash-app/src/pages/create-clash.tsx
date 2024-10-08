import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Challenge } from "@/lib/types";
import { challenges } from "@/lib/data";
import { ChallengeCard } from "@/components/profiling/challenges";
import { useNavigate } from "react-router-dom";



export default function CreateClash() {
    const navigate = useNavigate()
    const [challengeName, setChallengeName] = useState("")
    const [challengeType, setChallengeType] = useState("high")
    const [challengeDuration, setChallengeDuration] = useState("live")
    const [challengeBet, setChallengeBet] = useState(0)
    const [challengeParticipants, setChallengeParticipants] = useState(0)
    const [challenge, setChallenge] = useState<Challenge | null>(null)


    useEffect(() => {
        console.log(challengeDuration, challengeParticipants, challengeBet, challengeName, challengeType)
    }, [challengeDuration, challengeParticipants, challengeBet, challengeName, challengeType])

    return (
        <div className='flex flex-col h-screen w-screen relative'>
            <div className='flex-grow flex flex-col pb-10 overflow-y-auto'>
                <div className="flex flex-col pt-10 gap-4 px-4">
                    <img className="px-2 w-72" src={"/radar_people.svg"} />
                    <p className="text-white text-2xl">Create a Clash!</p>
                </div>

                <div className="pt-10 flex flex-col gap-6 px-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label className="text-white font-normal" htmlFor="name">Challenge Name</Label>
                        <Input onChange={(e) => setChallengeName(e.target.value)} value={challengeName} type="text" id="name" placeholder="Challenge Name" />
                    </div>


                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label className="text-white font-normal" htmlFor="bet">Set Clash Bet in Sol</Label>
                        <Input onChange={(e) => setChallengeBet(parseInt(e.target.value))} value={challengeBet} type="number" id="bet" placeholder="Clash Bet" />
                        <Label className="font-normal text-xs">Remaining Sol: 123</Label>
                    </div>

                    <div>
                        <Label className="text-white font-normal">Challenge Duration</Label>
                        <Tabs defaultValue="live" className="w-full" onValueChange={(value) => setChallengeDuration(value)}>
                            <TabsList className="w-full">
                                <TabsTrigger className="w-full" value="live">Live</TabsTrigger>
                                <TabsTrigger className="w-full" value="2">2 days</TabsTrigger>
                                <TabsTrigger className="w-full" value="7">7 days</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        {challengeDuration == "live" ? <Label className="font-normal text-xs">You will be put in an instant clash off!</Label> : <></>}
                    </div>


                    <div>
                        <Label className="text-white font-normal" htmlFor="participants">Number of Participants</Label>
                        <Select onValueChange={(value) => setChallengeParticipants(parseInt(value))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="2" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="text-white font-normal" htmlFor="participants">Select a challange to clash</Label>
                        <div className="pt-2">
                            {challenge ? <ChallengeCard challenge={challenge} /> : <Select onValueChange={(value) => setChallenge(challenges.find(challenge => challenge.title === value) ?? null)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a challenge" />
                                </SelectTrigger>
                                <SelectContent>
                                    {challenges.map((data) => {
                                        if (data.data !== "") {
                                            return (
                                                <SelectItem key={data.title} value={data.title}><ChallengeCard challenge={data} /></SelectItem>
                                            )
                                        }
                                    })}
                                </SelectContent>
                            </Select>}
                        </div>
                        <Tabs defaultValue="high" className="w-full pt-4" onValueChange={(value) => setChallengeType(value)}>
                            <TabsList className="w-full">
                                <TabsTrigger className="w-full" value="high"> <ArrowUpIcon className="w-4 h-4 mr-2" /> High</TabsTrigger>
                                <TabsTrigger className="w-full" value="low"> <ArrowDownIcon className="w-4 h-4 mr-2" /> Low</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>


            </div>
            <div className='w-full bg-[#1C1D1A] h-20 border-t items-center border-[#383A34]'>
                <div className="flex h-full flex-row items-center justify-around gap-10">
                    <Button onClick={() => navigate("/home")} variant={"destructive"}>Cancel</Button>
                    <Button>Create Clash for 10 XP</Button>
                </div>
            </div>
        </div>
    )
}