import { Card } from "@repo/ui/card"

export const P2PTransactions = ({
    transactions
}: {
    transactions: {
        time : Date,
        amount: number,
        type : string,
        userId : number
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
                <div className="flex gap-3 items-center">
                    <div>
                        <div className="text-sm">
                            {t.type} INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toLocaleString()}
                        </div>
                    </div>
                    {/* number not id */}
                    <div className="text-sm font-semibold border bg-slate-50 rounded-full p-2">
                        {t.type == "Received" ? "from" : "to"} user with {t.userId}
                    </div>
                </div>
                <div>
                    {t.type == "Received" ? "+" : "-" } Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}
