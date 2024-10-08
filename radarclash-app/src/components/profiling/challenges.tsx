import { PlusIcon } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { Category, Challenge } from "@/lib/types"
import { categories, challenges } from "@/lib/data"

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
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