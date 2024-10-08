import Clash from '@/components/home/clash'
import Explore from '@/components/home/explore'
import Navbar from '@/components/home/navbar'
import Profiling from '@/components/home/profiling'
import { useState, useEffect } from 'react'


export default function Home() {
    const pages = ["Explore", "Profiling", "Clash"]
    const [selectedPage, setSelectedPage] = useState(pages[0])
    const pageCallback = (page: string) => {
        setSelectedPage(page)
    }

    const logicalRender = () => {
        switch (selectedPage) {
            case "Explore":
                return <Explore />
            case "Profiling":
                return <Profiling />
            case "Clash":
                return <Clash />
        }
    }

    return (
        <div className='flex flex-col h-screen w-screen relative'>
            <div className='flex-grow flex flex-col items-center overflow-y-auto'>
                {logicalRender()}
            </div>
            <div className='w-full'>
                <Navbar pageCallback={pageCallback} />
            </div>
        </div>
    )
}