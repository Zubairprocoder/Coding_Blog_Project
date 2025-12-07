"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Menu, X } from "lucide-react";
import { HiMenuAlt3, HiMenuAlt1, HiMenu } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import TopProgress from "@/components/TopProgress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { NavigationMenuDemo } from "./ui/NavigationMenuDemo";

const categories = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Firebase",
  "MongoDB",
  "Shadcn UI",
  "Full Stack",
];

const homeLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Account", href: "/account" },
];

const blogLinks = [
  { label: "All Blog", href: "/blog" },
  { label: "Own Blog", href: "/blog/own" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Load Lordicon script */}

      <header className="sticky top-0 z-50 dark:bg-black bg-white shadow-md">
        <TopProgress className="bg-purple-600" />
        <div className="max-w-7xl mx-auto flex justify-between items-center py-1.5 px-5 ">
          {/* Logo */}
          <div className="relative text-xl md:text-2xl font-bold group cursor-pointer">
            <Link href="/" className="text-blue-600 dark:text-white">
              SkillUp Institute
            </Link>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenuDemo />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Sheet className="mt-3" open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button>
                  {open ? <Menu size={24} /> : <HiMenuAlt3 size={24} />}
                </button>
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader>
                  <div className="relative text-md   md:text-2xl font-bold group cursor-pointer">
                    <Link href="/" className="text-blue-600">
                      SkillUp Institute
                    </Link>
                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </div>
                </SheetHeader>

                {/* Accordion for Mobile */}
                <Accordion type="single" collapsible>
                  {/* HOME */}
                  <AccordionItem value="home">
                    <AccordionTrigger>Home</AccordionTrigger>
                    <AccordionContent>
                      {homeLinks.map((link) => (
                        <div
                          key={link.href}
                          className="group relative px-2 py-1"
                        >
                          <Link href={link.href} className="block relative">
                            {link.label}
                            <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                          </Link>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  {/* BLOG */}
                  <AccordionItem value="blog">
                    <AccordionTrigger>Blog</AccordionTrigger>
                    <AccordionContent>
                      {blogLinks.map((link) => (
                        <div
                          key={link.href}
                          className="group relative px-2 py-1"
                        >
                          <Link href={link.href} className="block relative">
                            {link.label}
                            <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                          </Link>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  {/* CATEGORY */}
                  <AccordionItem value="category">
                    <AccordionTrigger>Category Blog</AccordionTrigger>
                    <AccordionContent>
                      {categories.map((cat) => (
                        <div key={cat} className="group relative px-2 py-1">
                          <Link
                            href={`/blog/category/${cat.toLowerCase()}`}
                            className="block relative"
                          >
                            {cat}
                            <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                          </Link>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Dashboard + Account */}
                <div className="flex items-start justify-start flex-col ">
                  <div className="group relative px-4 py-1">
                    <Link
                      href="/dashboard"
                      className="block relative font-bold"
                    >
                      Dashboard
                      <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>

                  <div className="group relative px-5 py-1">
                    <Link href="/account" className="block relative font-bold">
                      Account
                      <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </div>

                {/* Login / Signup */}
                <div className="mt-4 flex items-center justify-center mx-auto gap-4">
                  <div className="group relative">
                    <Button variant="default" className="relative">
                      Login
                    </Button>
                  </div>

                  <div className="group relative">
                    <Button variant="secondary" className="relative">
                      Signup
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
