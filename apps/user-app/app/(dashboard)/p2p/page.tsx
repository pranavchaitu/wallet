import { getServerSession } from "next-auth";
import { SendP2P } from "../../../components/SendP2P";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransactions } from "../../../components/p2pTransactions";

async function getP2PTransactions(userId : number) {
    const data = await prisma.user.findFirst({
        where : {
            id : userId
        },
        select : {
            sentTransfers : {
                select : {
                    timestamp : true,
                    fromUser : true,
                    toUser : true,
                    amount : true
                }
            },
            receivedTransfers : {
                select : {
                    timestamp : true,
                    fromUser : true,
                    toUser : true,
                    amount : true
                }
            },
        }
    })
    return data?.receivedTransfers.concat(data.sentTransfers).sort((a,b) => {
        return b.timestamp.getTime() - a.timestamp.getTime()
    })
}

export default async function () {
    const session : any  = await getServerSession(authOptions)
    const userId = Number(session?.user?.id)
    const transactions = await getP2PTransactions(userId)
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendP2P />
            </div>
            <div>
                <P2PTransactions transactions={transactions!} userId={userId}/>
            </div>
        </div>
    </div>
}

