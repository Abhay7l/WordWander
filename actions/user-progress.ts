"use server";

import { auth } from "@clerk/nextjs";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
}