// app/blog/page.jsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  const contentDir = path.join(process.cwd(), "content");
  let files = [];

  // Try to read content folder; handle missing folder gracefully
  try {
    files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json"));
  } catch (err) {
    console.warn("Content folder not found, skipping blogs.", err);
  }

  const blogs = files
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      return {
        slug: file.replace(".json", ""),
        ...data,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">All Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {blog.coverImage ? (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={
                      blog.coverImage.startsWith("http")
                        ? blog.coverImage
                        : blog.coverImage
                    }
                    alt={blog.title}
                    fill
                    className="object-contain rounded-md"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4 flex-1">{blog.description}</p>
              <span className="text-sm text-gray-400 mb-4">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <Button asChild variant="outline" size="sm">
                <Link href={`/blogpost/${blog.slug}`}>Read More</Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
