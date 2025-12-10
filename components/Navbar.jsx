"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";

import TopProgress from "@/components/TopProgress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { NavigationMenuDemo } from "./ui/NavigationMenuDemo";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useUser } from "@/lib/contexts/UserContext";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";

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
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Account", href: "/account" },
  { label: "Dashboard", href: "/dashboard" },
];

const blogLinks = [
  { label: "All Blog", href: "/blog" },
  { label: "Own Blog", href: "/admindashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { userInfo, setUserInfo } = useUser();
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setUserInfo({ name: "", email: "", img: "" });
    router.push("/");
    setOpen(false);
  };

  const handleEditPicture = () => {
    fileInputRef.current?.click();
  };

 

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow-md">
      <TopProgress />
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-5">
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button>
                <HiMenuAlt3 size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                {/* User Menu */}
                {user && <UserMenu />}
              </SheetHeader>

              {/* Navigation Accordion */}
              <Accordion type="single" className="px-4" collapsible>
                <AccordionItem value="home">
                  <AccordionTrigger>Home</AccordionTrigger>
                  <AccordionContent>
                    {homeLinks.map((link) => (
                      <div key={link.href} className="group relative px-2 py-1">
                        <Link href={link.href} className="block relative">
                          {link.label}
                          <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="blog">
                  <AccordionTrigger>Blog</AccordionTrigger>
                  <AccordionContent>
                    {blogLinks.map((link) => (
                      <div key={link.href} className="group relative px-2 py-1">
                        <Link href={link.href} className="block relative">
                          {link.label}
                          <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

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

              {/* Dashboard link */}
              {user && (
                <div className=" flex flex-col items-center gap-4 justify-center">
                  <Link
                    href="/dashboard"
                    className="block font-bold relative group pl-8"
                  >
                    Dashboard
                    <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
