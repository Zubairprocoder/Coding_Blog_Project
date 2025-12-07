import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export default async function BlogPostPage({ params }) {
  const { slug } = await params;
 
  const filePath = path.join(process.cwd(), "content", `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const jsonData = fs.readFileSync(filePath, "utf-8");
  const blog = JSON.parse(jsonData);

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Cover Image Centered */}
      {blog.coverImage && (
        <div className="flex justify-center">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-32 h-32 object-contain rounded-xl dark:invert mb-4"
          />
        </div>
      )}

      {/* Title with Underline Animation */}
      <h1 className="md:text-3xl text-xl w-full mx-auto font-bold text-center text-purple-600 dark:text-white relative inline-block group leading-tight">
        {blog.title}
        {/* Underline span */}
        <span className="absolute left-0 -bottom-3 h-1 w-0 bg-purple-600 dark:bg-white rounded-full transition-all duration-500 group-hover:w-full"></span>
      </h1>

      {/* Author + Date */}
      <div className="flex justify-center items-center gap-4 text-gray-500 dark:text-white">
        <span>{blog.author}</span>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Description */}
      {blog.description && (
        <blockquote className="border-x-4 border-purple-600 px-6 italic text-gray-700 bg-purple-50 dark:bg-gray-900 py-4 rounded-lg text-center max-w-3xl mx-auto dark:text-white">
          {blog.description}
        </blockquote>
      )}

      {/* HTML Content */}
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-full text-gray-800 dark:text-gray-200 mx-auto">
        <div
          dangerouslySetInnerHTML={{ __html: blog.htmlContent }}
          className="prose dark:prose-invert"
        />
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex justify-center items-center flex-wrap gap-2 mt-4">
          {blog.tags.map((tag, idx) => (
            <Button key={idx} variant="default">
              {tag}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
