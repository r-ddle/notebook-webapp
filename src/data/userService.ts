"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

// ? Sends a request to the db to create a page after you give it some values
export async function createPage(values: {
  title: string;
  content?: string;
  id?: string;
  slug?: string;
}) {
  if (values.id) {
    // If id is provided, update the existing page's content
    await db.page.update({
      where: { id: values.id },
      data: { content: values.content },
    });
    return values.id;
  } else {
    // Create a new page
    const newPage = await db.page.create({
      data: {
        title: values.title,
        slug: values.title.toLowerCase().replace(/ /g, "-"),
        content: values.content ?? "",
      },
    });
    return newPage.id;
  }
}

// ? This is the interface for the Promise<Page[]> for typesafety
export interface Page {
  id: string;
  title: string;
}

// ? Awaits for db to select and return all the data that has id and title
export async function getAllPages() {
  return await db.page.findMany({
    select: { id: true, title: true, content: true },
    orderBy: { createdAt: "desc" },
  });
}

interface UpdatePageContentParams {
  slug: string;
  content: string;
}

export const updatePageContent = async ({
  slug,
  content,
}: UpdatePageContentParams) => {
  revalidatePath(`/${slug}`);
  try {
    const updatedPage = await db.page.update({
      where: { slug },
      data: { content },
    });
    return updatedPage;
  } catch (error) {
    console.error("Error updating page content:", error);
    throw new Error("Unable to update page content.");
  }
};
