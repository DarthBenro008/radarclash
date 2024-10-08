import { BoxIcon, CircleIcon, Gamepad2Icon, HeartIcon, IceCreamConeIcon, LaptopIcon, PlusIcon, ShoppingBagIcon } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

interface Challenge {
    title: string
    provider: string
    image: string
    provider_company: string
    category: string
    data: string
    data_descriptor: string
}

interface Category {
    category_name: string
    category_icon: React.ReactNode
}

const challenges: Challenge[] = [
    {
        "title": "Chess rating",
        "provider": "Games",
        "image": "/chess.svg",
        "provider_company": "Chess",
        "category": "Games",
        "data": "",
        "data_descriptor": "ELO"
    },
    {
        "title": "Uber trips",
        "provider": "Food/Rides",
        "image": "/uber.svg",
        "provider_company": "Uber",
        "category": "Food/Rides",
        "data": "",
        "data_descriptor": "Trips"
    },
    {
        "title": "Amazon Order Count",
        "provider": "E-com",
        "image": "/amazon.svg",
        "provider_company": "Amazon",
        "category": "commerce",
        "data": "",
        "data_descriptor": "Order Count"
    },
    {
        "title": "Duolingo XP",
        "provider": "Games",
        "image": "/duolingo.svg",
        "provider_company": "Duolingo",
        "category": "Games",
        "data": "",
        "data_descriptor": "XP"
    },
    {
        "title": "MonkeyType 30 seconds",
        "provider": "Games",
        "image": "/monkeytype.svg",
        "provider_company": "MonkeyType",
        "category": "Games",
        "data": "",
        "data_descriptor": "WPM"
    },
    {
        "title": "Zomato order count",
        "provider": "Food/Rides",
        "image": "/zomato.svg",
        "provider_company": "Zomato",
        "category": "Food/Rides",
        "data": "",
        "data_descriptor": "Order Count"
    },
    {
        "title": "Swiggy last order price",
        "provider": "Food/Rides",
        "image": "/swiggy.svg",
        "provider_company": "Swiggy",
        "category": "Food/Rides",
        "data": "",
        "data_descriptor": "Order Price"
    },

    {
        "title": "Leetcode",
        "provider": "Code",
        "image": "/leetcode.svg",
        "provider_company": "Leetcode",
        "category": "Code",
        "data": "",
        "data_descriptor": "Problems Solved"
    },
    {
        "title": "Github Repos",
        "provider": "Code",
        "image": "/github.svg",
        "provider_company": "Github",
        "category": "Code",
        "data": "",
        "data_descriptor": "Repositories"
    },
    {
        "title": "Github followers",
        "provider": "Code",
        "image": "/github.svg",
        "provider_company": "Github",
        "category": "Code",
        "data": "",
        "data_descriptor": "Followers"
    },
    {
        "title": "Github Contributions",
        "provider": "Code",
        "image": "/github.svg",
        "provider_company": "Github",
        "category": "Code",
        "data": "",
        "data_descriptor": "Contributions"
    },
    {
        "title": "Linkedin post impression count",
        "provider": "Social",
        "image": "/linkedin.svg",
        "provider_company": "Linkedin",
        "category": "Social",
        "data": "",
        "data_descriptor": "Impressions"
    },
    {
        "title": "Linkedin followers",
        "provider": "Social",
        "image": "/linkedin.svg",
        "provider_company": "Linkedin",
        "category": "Social",
        "data": "",
        "data_descriptor": "Followers"
    },
    {
        "title": "Instagram story views",
        "provider": "Social",
        "image": "/instagram.svg",
        "provider_company": "Instagram",
        "category": "Social",
        "data": "",
        "data_descriptor": "Views"
    },
    {
        "title": "Insta followers",
        "provider": "Social",
        "image": "/instagram.svg",
        "provider_company": "Instagram",
        "category": "Social",
        "data": "",
        "data_descriptor": "Followers"
    },
    {
        "title": "Reddit karma",
        "provider": "Social",
        "image": "/reddit.svg",
        "provider_company": "Reddit",
        "category": "Social",
        "data": "",
        "data_descriptor": "Karma"
    },
    {
        "title": "Twitter followers",
        "provider": "Social",
        "image": "/twitter.svg",
        "provider_company": "Twitter",
        "category": "Social",
        "data": "",
        "data_descriptor": "Followers"
    }
];


const categories: Category[] = [
    {
        "category_name": "All",
        "category_icon": <BoxIcon className="w-5 h-5" />
    },
    {
        "category_name": "Games",
        "category_icon": <Gamepad2Icon className="w-5 h-5" />
    },
    {
        "category_name": "Food/Rides",
        "category_icon": <IceCreamConeIcon className="w-5 h-5" />
    },
    {
        "category_name": "commerce",
        "category_icon": <ShoppingBagIcon className="w-5 h-5" />
    },
    {
        "category_name": "Code",
        "category_icon": <LaptopIcon className="w-5 h-5" />
    },
    {
        "category_name": "Social",
        "category_icon": <HeartIcon className="w-5 h-5" />
    }
];


function ChallengeCard({ challenge }: { challenge: Challenge }) {
    return (
        <div>
            <Card>
                <CardContent className="p-2">
                    <div className="flex flex-row justify-stretch w-full">
                        <div className="px-2 justify-center items-center flex flex-col">
                            <img src={challenge.image} />
                        </div>
                        <div className="flex flex-col justify-center gap-2 px-2">
                            <div>
                                <p className="text-sm">{challenge.title}</p>
                            </div>
                            <p className="text-xs text-gray-400">{challenge.provider_company}</p>
                        </div>
                        <div className="ml-auto p-2 flex flex-col items-center text-primary justify-center">
                            {challenge.data ? (
                                <p className="text-xl">{challenge.data}</p>
                            ) : (
                                <PlusIcon />
                            )}
                            {challenge.data ? (
                                <p className="text-xs text-gray-400">{challenge.data_descriptor}</p>
                            ) : (
                                <p>Add Score</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


function CategorySelectionBadge({ category, isSelected }: { category: Category, isSelected: boolean }) {
    return (
        <div>
            <Badge variant={isSelected ? "secondary" : "outline"} className={cn("flex flex-row gap-1 font-normal px-3 py-1", isSelected ? "text-primary" : "text-gray-400")}>{category.category_icon} {category.category_name}</Badge>
        </div>
    )
}


export default function Challenges() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    return (
        <div className="flex flex-col gap-3 w-full pb-4">
            <div className="flex flex-row overflow-x-auto gap-2 no-scrollbar">
                {categories.map((category) => (
                    <div onClick={() => setSelectedCategory(category.category_name)}>
                        <CategorySelectionBadge category={category} isSelected={selectedCategory === category.category_name} />
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
                {challenges.map((challenge) => {
                    if (selectedCategory === "All" || challenge.category === selectedCategory) {
                        return <ChallengeCard challenge={challenge} />
                    }
                })}
            </div>
        </div>
    )
}