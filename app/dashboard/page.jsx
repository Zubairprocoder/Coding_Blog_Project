"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
const techList = [
  // 🟦 FRONTEND
  {
    category: "Frontend",
    title: "React JS",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    description:
      "Build fast, interactive UIs using modern component-based architecture.",
  },
  {
    category: "Frontend",
    title: "Next.js",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    description:
      "SEO-friendly, fullstack React framework with server & client rendering.",
  },
  {
    category: "Frontend",
    title: "Firebase",
    img: "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
    description:
      "Backend-as-a-service for auth, database, hosting, and storage.",
  },
  {
    category: "Frontend",
    title: "Figma",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    description:
      "Design modern UI/UX layouts and prototypes for web applications.",
  },
  {
    category: "Frontend",
    title: "Shadcn UI",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",
    description: "Beautiful, reusable components built on top of Radix UI.",
  },

  // 🟥 BACKEND
  {
    category: "Backend",
    title: "Node.js",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    description: "JavaScript runtime to build powerful backend and APIs.",
  },
  {
    category: "Backend",
    title: "MongoDB",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    description: "Modern NoSQL database used for full-stack web apps.",
  },
  {
    category: "Backend",
    title: "Express.js",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    description: "Fast, minimal backend framework used with Node.js.",
  },
  {
    category: "Backend",
    title: "REST API",
    img: "https://cdn-icons-png.flaticon.com/512/2910/2910761.png",
    description: "Build scalable APIs for fullstack web applications.",
  },
  {
    category: "Backend",
    title: "JWT Auth",
    img: "https://cdn-icons-png.flaticon.com/512/1199/1199523.png",
    description: "Secure authentication using JSON Web Tokens.",
  },
];

export default function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-600">
        Coding Blog Dashboard
      </h1>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="scroll-m-20 p-10"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-6">
          Featured Posts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techList.map((item, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between hover:shadow-lg transition-all duration-300 h-full"
            >
              <CardHeader className="flex justify-center items-center p-4">
                <div className="w-32 h-32 relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 p-4">
                <CardTitle className="text-center">{item.title}</CardTitle>
                <CardDescription className="mt-2 text-center flex-1">
                  {item.description}
                </CardDescription>
                <Button
                  asChild
                  variant="link"
                  className="mt-4 w-full hover:underline hover:underline-offset-4 text-white bg-black"
                >
                  <Link href="/blog">Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
