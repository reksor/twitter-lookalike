import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismaDb";
import { json } from "stream/consumers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    const { currentUser: user } = await serverAuth(req, res);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: `${user.username} followed you!`,
            userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotifications: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter((follwingId) => {
        follwingId !== userId;
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    // console.log("BROCK");

    return res.status(400).end();
  }
}
