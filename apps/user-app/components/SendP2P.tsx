"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";

export function SendP2P() {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [number,setNumber] = useState("")
    const [amount,setAmount] = useState("")
    return <Card title="Send">
    <div className="w-full">
        <TextInput label={"Number"} placeholder={"Number"} onChange={setNumber}/>
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={setAmount}/>
        <div className="flex justify-center pt-4">
            <Button Loading={loading} onClick={() => {
                setLoading(true)
                try {
                    p2pTransfer(number,Number(amount) * 100)
                    .then(() => {
                        setLoading(false)
                        // router.push('/transfer')
                        window.location.reload()
                    })                    
                } catch (error) {
                    console.log("error handled");
                }
            }} > 
            Send
            </Button>
        </div>
    </div>
</Card>
}