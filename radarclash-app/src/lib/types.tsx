export interface Challenge {
    title: string
    provider: string
    image: string
    provider_company: string
    category: string
    data: string
    data_descriptor: string
}

export interface Category {
    category_name: string
    category_icon: React.ReactNode
}
