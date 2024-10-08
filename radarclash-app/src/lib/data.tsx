import { BoxIcon, Gamepad2Icon, HeartIcon, IceCreamConeIcon, LaptopIcon, ShoppingBagIcon } from "lucide-react";
import { Challenge, Category } from "./types";

export const challenges: Challenge[] = [
    {
        "title": "Chess rating",
        "provider": "Games",
        "image": "/chess.svg",
        "provider_company": "Chess",
        "category": "Games",
        "data": "123",
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


export const categories: Category[] = [
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