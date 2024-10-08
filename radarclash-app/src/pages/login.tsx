import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function Login() {

    console.log("LoginPage component rendered");
    const navigate = useNavigate();
    const { authenticate } = useOkto() as OktoContextType;
    const [authToken, setAuthToken] = useState();
    const BASE_URL = "https://sandbox-api.okto.tech";
    const OKTO_CLIENT_API = import.meta.env.VITE_OKTO_SDK;


    const apiService = axios.create({
        baseURL: BASE_URL,
        headers: {
            "x-api-key": OKTO_CLIENT_API,
            "Content-Type": "application/json",
        },
    });

    const handleGoogleLogin = async (credentialResponse: any) => {
        console.log("Google login response:", credentialResponse);
        const idToken = credentialResponse.credential;
        console.log("google idtoken: ", idToken);
        authenticate(idToken, async (authResponse: any, error: any) => {
            if (authResponse) {
                console.log("auth token received", authToken);
                window.localStorage.setItem("authToken", authToken!!);
                toast.success("Login Successful");
                navigate("/location");
            }
            if (error) {
                console.error("Authentication error:", error);
            }
        });
    };

    return (
        <div className="bg-[url('/onboarding.png')] relative bg-cover bg-center bg-no-repeat h-screen">
            <div className="flex flex-col gap-4 h-screen items-center justify-end">
                <div className=" flex flex-col items-center gap-2 pb-14">
                    <img src="/logo.svg" />
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-2xl text-white font-bold">Welcome to</p>
                        <p className="text-5xl text-white font-bold">RadarClash</p>
                        <p className="text-sm text-gray-400 max-w-[300px] text-center">The one of a kind decentralised local wagering app, powered by zk-rollups!</p>
                    </div>
                    <p className="pt-10">Ready to clash in real-time?</p>
                </div>
                <div className="pb-6">
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button className="" size="lg">Let start Clashing</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-[300px] rounded-xl">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-xl">Welcome to RadarClash</p>
                                <p className="text-sm text-gray-400 text-center">New to Web3? Don't worry, it will be as seamless as an web2 app!</p>
                                <div>
                                    {!authToken ? (
                                        <GoogleLogin
                                            onSuccess={handleGoogleLogin}
                                            onError={() => {
                                                toast.error("Login Failed");
                                                console.log("Login Failed");
                                            }}
                                            useOneTap
                                            promptMomentNotification={(notification) =>
                                                console.log("Prompt moment notification:", notification)
                                            }
                                        />
                                    ) : (
                                        <> Authenticated </>
                                    )}
                                </div>
                                <div className="flex pt-2 flex-row items-center gap-1">
                                    <p className="text-xs text-gray-400">Powered by Okto</p>
                                    <div className="flex items-center gap-2">
                                        <img src="/okto.png" />
                                    </div>
                                </div>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
                <div className="flex flex-col pb-4 items-center gap-1">
                    <p className="text-sm text-gray-400">Powered by</p>
                    <div className="flex items-center gap-2">
                        <img className="w-4 h-4" src="/solana.png" />
                        <img className="w-4 h-4" src="/okto.png" />
                        <img className="w-4 h-4" src="/reclaim.jpeg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
