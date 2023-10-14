import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../libs/prismaDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      // console.log("SHRek");
      throw new Error("Invalid ID");
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotifications: false,
      },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
