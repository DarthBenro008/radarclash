import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Location() {
    const navigate = useNavigate();
    function getLocation() {   
        console.log('getLocation was called') 
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, 
            positionError);
        } else {
            console.log('Geolocation is not supported by this device')
            toast.error('Geolocation is not supported by this device')
        }
    }

    function positionError() {    
        console.log('Geolocation is not enabled. Please enable to use this feature')
        toast.error('Geolocation is not enabled. Please enable to use this feature')
     }

    function showPosition(data: any){
        console.log('posititon accepted', data)
        toast.success('Location access granted')
        navigate("/home");
    }

    const handleAllowLocation = () => {
        getLocation();
    }

    return (
        <div className="relative h-screen">
            <img src="/location.svg" />
            <div className="flex flex-col gap-5 pt-24 px-6">
                <img className="w-10 h-10" src="/pinpoint.svg" />
                <p className="text-xl text-white">Allow RadarClash to access location to...</p>
                <p className="text-sm text-gray-400">
                   - Allow RadarClash to access location to find nearby players
                </p>
                <p className="text-sm text-gray-400">
                   - Gain XP by increasing your coverage area
                </p>
                <p className="text-sm text-gray-400">
                   - Wager locally and earn $SOL
                </p>
            </div>
            <div className="absolute bottom-4 left-0 w-full">
                <div className="flex flex-row gap-2 px-4">
                    <Button className="w-full" onClick={handleAllowLocation}>Allow location access</Button>
                </div>
            </div>
        </div>
    )
}