import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

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
                navigate("/home");
            }
            if (error) {
                console.error("Authentication error:", error);
            }
        });
    };

    return (
        <div>
            {!authToken ? (
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
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
    );
}
