"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider : string, amount : string) {
    const session = await getServerSession(authOptions)
    const token = Math.random().toString()
    const userId = session.user.id
    if(!session.user || !session.user.id) {
        return {
            message : "Unauthorized user"
        }
    }
    await prisma.onRampTransaction.create({
        data : {
            userId : Number(userId),
            token,
            startTime : new Date(),
            status : "Processing",
            amount : Number(amount) * 100,
            provider,
        }
    })
    // MYTODO - should done in separate bank server lets dupify it and its page
    // const res = await axios.post('http://localhost:3003/hdfcWebhook',{
    //     token,
    //     user_identifier : userId,
    //     amount : (Number(amount) * 100).toString()
    // })
    // console.log(res);
    return {
        message : "Done"
    }
}