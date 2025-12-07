"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Herosection from "@/components/ui/Herosection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// --- 10 images (Unsplash)
const IMAGES = [
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?q=80&w=1400&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
];

// --- Roadmaps
const FRONTEND_ROADMAP = [
  "HTML & Semantic Markup",
  "CSS (Layouts, Flexbox, Grid)",
  "Responsive Design",
  "JavaScript (ES6+)",
  "Tailwind CSS & Utility-first",
  "Bootstrap (optional)",
  "React (components & hooks)",
  "Next.js (SSR / App Router)",
  "Figma basics (design)",
  "Shadcn UI & Reusable Components",
];
const BACKEND_ROADMAP = [
  "Node.js Fundamentals",
  "Express.js (APIs & Middleware)",
  "Databases (MongoDB)",
  "Authentication & Authorization",
  "REST & GraphQL APIs",
  "Testing & Deployment",
  "Cloud basics (Firebase / Vercel)",
  "Security basics",
  "Project structuring & best practices",
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

const frontendSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Firebase",
  "Figma",
  "Shadcn UI",
  "Framer Motion",
];

const backendSkills = [
  "Node.js",
  "MongoDB",
  "Express.js",
  "REST API",
  "JWT Auth",
  "Firebase Auth",
  "Postman",
];
const features = [
  {
    title: "Project-Based Learning",
    description: "Build real-world projects and portfolio pieces.",
    content:
      "Each module includes a capstone project and step-by-step walkthrough. By completing these projects, you gain practical experience and a strong portfolio to showcase your skills to employers.",
    buttonText: "See Projects",
    buttonVariant: "default",
  },
  {
    title: "Mentorship",
    description: "Get feedback and reviews on your code.",
    content:
      "Pair programming sessions, one-on-one mentorship, and code reviews are part of the program. Our mentors are experienced developers who provide guidance to help you improve faster.",
    buttonText: "Request Mentor",
    buttonVariant: "outline",
  },
  {
    title: "Certificates",
    description: "Earn certificates for completed roadmaps.",
    content:
      "Shareable certificates validate your skills and knowledge. You can include them on your LinkedIn profile, resume, or personal portfolio.",
    buttonText: "Learn More",
    buttonVariant: "link",
  },
  {
    title: "Interactive Tutorials",
    description: "Hands-on tutorials to learn by doing.",
    content:
      "Our tutorials are designed to be interactive, allowing you to write code directly in the browser and see real-time results.",
    buttonText: "Explore Tutorials",
    buttonVariant: "default",
  },
  {
    title: "Community Support",
    description: "Join an active developer community.",
    content:
      "Access a supportive community of learners and professionals. Participate in discussions, get answers to your questions, and collaborate on projects.",
    buttonText: "Join Community",
    buttonVariant: "outline",
  },
  {
    title: "Career Guidance",
    description: "Get help landing your dream job.",
    content:
      "We provide career coaching, resume reviews, interview preparation, and guidance on how to position yourself for top tech roles.",
    buttonText: "Start Career Support",
    buttonVariant: "default",
  },
];
const faqData = [
  {
    id: 1,
    question: "What is Full-Stack Development?",
    answer:
      "Full-stack development means working on both the frontend and backend of a web application, including UI, server logic, and databases.",
  },
  {
    id: 2,
    question: "What is Frontend Development?",
    answer:
      "Frontend includes everything visible to the user such as layouts, UI components, styling, and animations using HTML, CSS, JavaScript, React, and Next.js.",
  },
  {
    id: 3,
    question: "What is Backend Development?",
    answer:
      "Backend handles servers, authentication, APIs, routing, and databases using tools like Node.js, Express.js, MongoDB, PostgreSQL, and Prisma.",
  },
  {
    id: 4,
    question: "What skills do I need to become a full-stack developer?",
    answer:
      "Skills include HTML, CSS, JavaScript, React, Git, Node.js, Express, Databases, API development, Deployment, and Debugging.",
  },
  {
    id: 5,
    question: "Which tools are best for coding?",
    answer:
      "Popular tools: VS Code, GitHub, Postman, Figma, Docker, TailwindCSS, Next.js, Prisma Studio, MongoDB Compass.",
  },
  {
    id: 6,
    question: "What is an API?",
    answer:
      "An API (Application Programming Interface) allows frontend and backend to communicate and exchange data.",
  },
  {
    id: 7,
    question: "Is full-stack development a good career?",
    answer:
      "Yes! Full-stack developers are in demand worldwide due to their ability to work on complete application workflows.",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 120 },
  }),
};
// --- Animations
const heroVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};
const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const listVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function TalkoarHomepage() {
  // Slider state
  const [index, setIndex] = useState(0);
  const slideRef = (useRef < HTMLDivElement) | (null > null);
 
  const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIndex((i) => (i + 1) % IMAGES.length);
  const goTo = (i) => setIndex(i);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval);
  }, []);

  
  return (
    <main className="max-w-6xl mx-auto px-6 py-8 md:py-16  overflow-hidden">
      <Herosection />

      {/* ROADMAPS */}
      <section className="mt-12 grid gap-10 md:grid-cols-2 ">
        {/* Frontend Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-2"
        >
          <h2 className="text-3xl font-bold mb-2 tracking-tight">
            Frontend Roadmap
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Step-by-step path to becoming a modern frontend developer.
          </p>

          <motion.ol
            variants={listVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="ml-4 space-y-4 border-l border-border pl-6"
          >
            {FRONTEND_ROADMAP.map((s, i) => (
              <motion.li variants={itemVariant} key={i} className="relative">
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-blue-500"
                ></motion.span>

                <div className="flex items-center gap-3">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-0.5 text-xs font-semibold text-blue-600 border border-blue-300 rounded"
                  >
                    Front
                  </motion.span>
                  <span className="text-base">{s}</span>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <div className="mt-6 flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="default" className="px-6">
                Start Frontend
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="link">View Courses</Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Backend Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="p-2"
        >
          <h2 className="text-3xl font-bold mb-2 tracking-tight">
            Backend Roadmap
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            The core backend concepts and tools to build production APIs.
          </p>

          <motion.ol
            variants={listVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="ml-4 space-y-4 border-l border-border pl-6"
          >
            {BACKEND_ROADMAP.map((s, i) => (
              <motion.li variants={itemVariant} key={i} className="relative">
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-purple-500"
                ></motion.span>

                <div className="flex items-center gap-3">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-0.5 text-xs font-semibold text-purple-600 border border-purple-300 rounded"
                  >
                    Back
                  </motion.span>
                  <span className="text-base">{s}</span>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <div className="mt-6 flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="default" className="px-6">
                Start Backend
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="link">View Courses</Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* blog post */}

      <div className="max-w-6xl mx-auto px-2 md:px-4 py-6 ">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 px-4">
          Welcome to Full-Stack Development
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground mb-6 px-4 sm:px-8 md:px-16">
          A complete platform to learn Frontend, Backend, and Full-Stack
          Development with modern roadmaps, tutorials, and projects.
        </p>

        <section className="max-w-4xl mx-auto text-center md:py-6 pb-6   px-2 md:px-4">
          {/* Main Roadmap Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Button className="bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 transition-transform mx-auto mb-8">
              Full Stack Developer Roadmap
            </Button>
          </motion.div>

          {/* Frontend Roadmap */}
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Frontend Developer Roadmap
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {frontendSkills.map((skill, i) => (
                <motion.div key={skill} custom={i} variants={cardVariant}>
                  <Button variant="outline">{skill}</Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Backend Roadmap */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Backend Developer Roadmap
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {backendSkills.map((skill, i) => (
                <motion.div key={skill} custom={i} variants={cardVariant}>
                  <Button variant="outline">{skill}</Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        {/* GRID */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl mx-auto w-full font-bold text-center mb-4 relative inline-block px-4">
          <span className="relative group">
            Full-Stack Dev Blog & Roadmaps
            <span className="absolute left-0 -bottom-1 h-1 w-0 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </span>
        </h2>

        <p className="text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-8 px-4 sm:px-8 md:px-16">
          Learn Frontend and Backend development step by step with modern
          roadmaps, tutorials, and real-world projects.
        </p>
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
      </div>
      {/* COLLAPSIBLE SLIDER + GRID */}
      <section className="mt-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
          Visual Gallery
        </h2>

        {/* Main Carousel */}
        <div className="w-full mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {IMAGES.map((src, i) => (
                <CarouselItem key={i}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full overflow-hidden rounded-xl"
                  >
                    <img
                      src={src}
                      alt={`Slide ${i + 1}`}
                      className="w-full h-[350px] object-cover rounded-xl"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Thumbnail Preview Grid */}
        <div className="mt-6 grid grid-cols-5 gap-3">
          {IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)} // Carousel API
              className="rounded-md overflow-hidden group"
            >
              <motion.img
                src={src}
                alt={`Thumb ${i + 1}`}
                className="w-full h-20 object-cover rounded-md group-hover:scale-110 transition-transform duration-300"
                whileHover={{ opacity: 0.85 }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED BLOCKS / CTA */}

      <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="md:p-6 px-4 ">
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <h3 className="text-md text-gray-600  mb-4">
              {feature.description}
            </h3>
            <p className="text-sm leading-relaxed mb-6">{feature.content}</p>
            <Button variant={feature.buttonVariant}>
              {feature.buttonText}
            </Button>
          </div>
        ))}
      </section>

      {/* FOOTER CTA */}
      <section className="mt-7 text-center">
        <h3 className="text-xl font-semibold">Ready to start?</h3>
        <p className="mt-2 max-w-xl mx-auto">
          Follow the roadmaps, build projects and grow as a Full-Stack
          developer.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Button variant="default">Enroll Now</Button>
          <Button variant="link">Contact</Button>
        </div>
      </section>
      {/* Faq data */}
      <h1 className="scroll-m-20 py-6 md:py-8 text-center text-xl md:text-4xl font-semibold tracking-tight text-balance">
        Your Coding Questions Answered
      </h1>

      <Accordion type="single" collapsible>
        {faqData.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
            <AccordionTrigger className="text-md font-bold">
              {item.question}
            </AccordionTrigger>

            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
