import TextEditor from "~/components/text-editor";
import { db } from "~/server/db";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface Params {
  slug: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const pages = await db.page.findUnique({
    where: {
      slug: slug,
    },
  });

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{pages?.title}</h1>
      <div className="h-96 w-[700px] rounded-lg border bg-black bg-opacity-5 p-4 text-start backdrop-blur-sm">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {pages?.content ?? ""}
        </ReactMarkdown>
      </div>
      <TextEditor slug={slug} initialContent={pages?.content} />
    </main>
  );
}
