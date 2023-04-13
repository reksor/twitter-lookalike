import { PrismaClient } from "@prisma/client";
//prevents next.JS from hot reloading bc it breaks when too many instances are active
declare global {
    var prisma: PrismaClient | undefined
}

const client= globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== 'production') globalThis.prisma= client;
export default client;
