"use server";
import { Subscription } from "./supabase.types";
import db from "./db";
export const getUserSubscription = async (userId : string) => {

    try{
        const data= await db.query.subscriptions.findFirst({
            where: (subscription, { eq }) => eq(subscription.userId, userId)

        });
        if (data) return { data: data as Subscription, error: null };
        return { data: null, error: null };
    }catch(e){
        console.error(e);
       return { data: null, error: e };
    }

};