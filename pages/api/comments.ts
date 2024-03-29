import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prismaDb";
import {} from "./posts/[postId]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;
    const { postId } = req.query;

    // console.log("body and postId",body,postId);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    // console.log(comment);

    // const post= await prisma.post.update({
    //     where:{
    //         id:postId
    //     },
    //     data: {
    //         comments: {
    //             body:body,
    //             userId: currentUser.id,
    //             postId:
    //         }
    //     }
    // })

    // const post= await prisma.post.findUnique({
    //     where: {
    //         id: postId
    //     }})

    //     await prisma.post.update({
    //         where:{
    //             id:postId
    //         },
    //         data:{
    //             comments: comment
    //         }
    //     })

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: `${currentUser.username} commented "${comment.body}" on your sweet!`,
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotifications: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    // console.log("COMMENT SHOULD BE HERE",comment);
    // console.log(body);

    // console.log("POST IN comments");

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
