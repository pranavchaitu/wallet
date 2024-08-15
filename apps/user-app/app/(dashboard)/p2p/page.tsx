import { getServerSession } from "next-auth";
import { SendP2P } from "../../../components/SendP2P";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransactions } from "../../../components/p2pTransactions";

async function getSentP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        userId : t.toUserId,
        amount: t.amount,
        type : "Sent"
    }))
}

async function getRecievedP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        userId : t.fromUserId,
        amount: t.amount,
        type : "Received"
    }))
}


export default async function () {
    const sentTransactions = await getSentP2PTransactions()
    const recievedTransactions = await getRecievedP2PTransactions()
    const transactions = sentTransactions.concat(recievedTransactions)
    transactions.sort((a,b) => {
        return b.time.getTime() - a.time.getTime()
    })
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendP2P />
            </div>
            <div>
                <P2PTransactions transactions={transactions}/>
            </div>
        </div>
    </div>
}

