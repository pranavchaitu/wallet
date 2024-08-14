import prisma from "@repo/db/client"
import { atom } from "recoil";
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../apps/user-app/app/lib/auth"

// async function getBalance() {
//     const session = await getServerSession(authOptions);
//     const balance = await prisma.balance.findFirst({
//         where: {
//             userId: Number(session?.user?.id)
//         }
//     });
//     // await new Promise(t => setTimeout(t,3000))
//     return balance!.amount || 0
// }

export const balanceAtom = atom<number>({
    key: "balance",
    default: 0,
})