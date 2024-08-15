import { Card } from "@repo/ui/card"
import prisma from "@repo/db/client"
type StatusType = "Processing" | "Success" | "Failed"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="space-y-5 flex justify-between items-center">
                <div className="flex">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toLocaleString()}
                        </div>
                    </div>
                    <div className="ml-2">
                        <StatusButton type={t.status}/>
                    </div>
                </div>
                <div>
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}

function StatusButton({ type } : { type : string }) {
    if(type == "Processing") {
        return <button className="rounded-full text-sm p-2 bg-orange-400">
            { type }
        </button>
    } else if(type  == "Success") {
        return <button className="rounded-full text-sm p-2 bg-green-400">
            { type }
        </button>
    } else {
        return <button className="rounded-full text-sm p-2 bg-red-400">
            { type }
        </button>
    }
}
