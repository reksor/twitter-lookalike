import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from '../../../libs/prismaDb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method!=="DELETE"){
        return res.status(405).end()
    }

    try{
        const {postId}=req.query;

        const {currentUser}=await serverAuth(req,res);

        if(!postId || typeof postId!=="string"){
            throw new Error("Invalid ID")
        }

        const post=await prisma.post.findUnique({
            where: {
                id: postId
            }
        });
        

        if(!post){
            throw new Error("Invalid ID")
        }

        if (post.userId===currentUser.id){

            console.log("WE ARE HERE");
            
            const updatedPosts=await prisma.post.delete({
                where: {
                    id:postId
                }
            })
            return res.status(200).json(updatedPosts)
        }
 
        return res.status(200).json(post)

    }catch(error){
        console.log(error);
        return res.status(400).end()
        
    }
}