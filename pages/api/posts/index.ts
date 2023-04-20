import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "../../../libs/prismaDb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    if(req.method !== "POST" && req.method !== "GET"){
        res.status(405).end()
    }

    try {
        if(req.method==="POST"){
            const {currentUser}= await serverAuth(req, res);
            //referse to body in Schema
            const {body}= req.body

            const post= await prisma.post.create({
                data: {
                    body,
                    userId: currentUser.id
                }
            });

            return res.status(200).json(post)
        }

        if(req.method === "GET"){
            const { userId } = req.query;
            console.log('query',userId);

            const {usId}=req.body;
            console.log("body" , usId);
            
            let posts;

            if(userId && typeof userId==="string"){
                console.log("POST IN index if");
                posts=await prisma.post.findMany({
                    where: {
                        userId
                    },
                    include: {
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    },
                })
            }else{
                console.log("POST IN index else");
                posts= await prisma.post.findMany({
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                });
                // console.log(posts);
                
            }
            console.log("POST IN index");

            return res.status(200).json(posts);

        }

    }catch (err) {
        console.log(err);
        return res.status(400).end()
        
    }
}