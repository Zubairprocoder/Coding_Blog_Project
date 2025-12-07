"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const posts = [
  { title: "Mastering HTML & Semantics", author: "Zubair", date: "2025-12-06" },
  {
    title: "CSS & Tailwind Modern Design",
    author: "Zubair",
    date: "2025-12-05",
  },
  {
    title: "JavaScript & ES6+ Essentials",
    author: "Zubair",
    date: "2025-12-04",
  },
];

export default function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-600">
        Coding Blog Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                By {post.author} <br />
                {post.date}
              </CardContent>
              <Button
                variant="link"
                className="mt-auto text-purple-600 hover:underline"
              >
                View Post
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
