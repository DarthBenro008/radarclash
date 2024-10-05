import { useState, useEffect } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import QRCode from 'react-qr-code'
import { OktoContextType, useOkto } from 'okto-sdk-react'

export default function Home() {
    const [reclaimProofRequest, setReclaimProofRequest] = useState<any>(null)
    const [requestUrl, setRequestUrl] = useState('')
    const [statusUrl, setStatusUrl] = useState('')
    const [proofs, setProofs] = useState(null)
    const { getUserDetails } = useOkto() as OktoContextType

    useEffect(() => {
        getUserDetails().then((user) => {
            console.log(user)
        })
        async function initializeReclaim() {
            const APP_ID = import.meta.env.VITE_RECLAIM_APP_ID
            const APP_SECRET = import.meta.env.VITE_RECLAIM_SECRET
            const PROVIDER_ID = 'bd95d43f-e06a-4fd7-ac46-3f4c9da284f0'

            const proofRequest = await ReclaimProofRequest.init(
                APP_ID,
                APP_SECRET,
                PROVIDER_ID
            )
            setReclaimProofRequest(proofRequest)
        }

        initializeReclaim()
    }, [])

    async function handleCreateClaim() {
        if (!reclaimProofRequest) {
            console.error('Reclaim Proof Request not initialized')
            return
        }

        const url = await reclaimProofRequest.getRequestUrl()
        setRequestUrl(url)

        const status = reclaimProofRequest.getStatusUrl()
        setStatusUrl(status)
        console.log('Status URL:', status)


        try {
            await reclaimProofRequest.startSession({
                onSuccess: (proofs: any) => {
                    console.log('Verification success', proofs)
                    setProofs(proofs)
                },
                onError: (error: Error) => {
                    console.error('Verification failed', error)
                }
            })
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="App">
            <h1>Reclaim Protocol Demo</h1>
            <button onClick={handleCreateClaim}>Create Claim</button>
            {requestUrl && (
                <div>
                    <h2>Scan this QR code to start the verification process:</h2>
                    <QRCode value={requestUrl} />
                </div>
            )}
            {proofs && (
                <div>
                    <h2>Verification Successful!</h2>
                    <pre>{JSON.stringify(proofs, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}