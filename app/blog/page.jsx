import fs from "fs";
import path from "path";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Shadcn UI button

// Server Component: fs works only on server
export default function BlogPage() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir);

  const blogs = files
    .filter((file) => file.endsWith(".json")) // JSON files only
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(jsonData);

      return {
        slug: file.replace(".json", ""),
        ...data,
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // oldest first, newest last

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">All Blogs</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.slug}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4 flex-1">{blog.description}</p>
            <span className="text-sm text-gray-400 mb-4">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {/* Shadcn UI Read More Button */}
            <Button asChild variant="outline" size="sm">
              <Link href={`/blogpost/${blog.slug}`}>Read More</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
