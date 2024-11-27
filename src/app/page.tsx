import Link from "next/link";
import { CreatePageDialog } from "~/components/dialog";
import { Button } from "~/components/ui/button";
import { db } from "~/server/db";

export default async function Home() {
  const pages = await db.page.findMany();
  const totalPages = await db.page.count();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="h-fit w-fit bg-opacity-10 p-4 backdrop-blur-sm">
        <h1 className="text-center text-4xl font-bold">
          Note Pages ({totalPages})
        </h1>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {pages.map((page) => (
            <Button key={page.id} variant={"outline"}>
              <Link href={`/${page.slug}`}>{page.title}</Link>
            </Button>
          ))}
          <CreatePageDialog />
        </ul>
      </div>
    </main>
  );
}
