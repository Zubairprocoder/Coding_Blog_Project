"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import TypeWriter from "@/components/Typed";

export default function About() {
  // SKILLS ARRAY
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Tailwind CSS",
    "Bootstrap",
    "React",
    "Next.js",
    "Firebase",
    "Shadcn UI",
    "Figma UI",
  ];
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
  return (
    <>
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="scroll-m-20 text-center p-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:text-3xl font-bold tracking-tight text-center lg:text-left relative w-fit mx-auto lg:mx-0"
        >
          {/* Flex container: column on mobile, row on md+ */}
          <span className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
            {/* NEW WELCOME LINE */}
            <span className="text-3xl  pb-0 md:pb-0">Welcome to Our</span>

            {/* MAIN TITLE with underline */}
            <span className="relative group inline-block">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text dark:text-white text-transparent text-2xl md:text-3xl">
                <TypeWriter />
              </span>
              {/* Underline only under this title */}
              <span className="absolute left-0 -bottom-1 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </span>
          </span>
        </motion.h1>
        <p className="mt-4 text-xl leading-relaxed">
          I create coding tutorials, projects, and modern full-stack
          applications.
        </p>

        {/* HERO BUTTONS */}
        <div className="flex justify-center gap-4 mt-8">
          {/* View Blogs */}
          <Button asChild>
            <Link href="/blog">View Blogs</Link>
          </Button>

          {/* Projects */}
          <Button variant="outline" asChild>
            <Link href="/projects">Projects</Link>
          </Button>

          {/* Hire Me */}
          <Button variant="secondary" asChild>
            <Link href="/contact">Hire Me</Link>
          </Button>
        </div>
      </motion.div>

      {/* SKILLS SECTION */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="scroll-m-20 p-10 text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Skills</h2>

        {/* SKILLS USING MAP */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {skills.map((skill, index) => (
            <Button key={index} variant="outline" className="cursor-default">
              {skill}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* FEATURED BLOG POSTS */}
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
    </>
  );
}
