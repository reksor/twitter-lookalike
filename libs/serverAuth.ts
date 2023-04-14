import { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from './prismaDb'


//need a res,authOptions
const serverAuth= async (req: NextApiRequest, res: NextApiResponse) =>{
    const session = await getServerSession( req , res, authOptions );

    if(!session?.user?.email){
        throw new Error("Not signed in..Not Sweet :/")
    }
    const currentUser=await prisma?.user.findUnique({
        where:{
            email: session.user.email
        }
    });

    if(!currentUser){
        throw new Error("Not signed in..Not Sweet :/")
    }

    return {currentUser}
}

export default serverAuth;