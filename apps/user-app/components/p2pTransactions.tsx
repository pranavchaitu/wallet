import { Card } from "@repo/ui/card"

export const P2PTransactions = ({
    transactions,
    userId
} : {
    transactions: {
        timestamp : Date,
        amount: number,
        fromUser : {
          id : number,
          name : string | null
        },
        toUser : {
            id : number,
            name : string | null
        },
    }[],
    userId : number
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
                <div className="flex gap-3 items-center">
                    <div>
                        <div className="text-sm">
                            {t.toUser.id == userId ? "Received" : "Sent"} INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.timestamp.toLocaleString()}
                        </div>
                    </div>
                    <div className="text-sm font-semibold border bg-slate-50 rounded-full p-2">
                        {t.fromUser.id == userId ? `to ${t.toUser.name || "Anonymous"}`  : `from ${t.fromUser.name || "Anonymous"}`} 
                    </div>
                </div>
                <div>
                    {t.fromUser.id == userId ? "-" : "+" } Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}
