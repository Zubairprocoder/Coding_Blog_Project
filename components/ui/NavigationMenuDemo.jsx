"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Script from "next/script";
// ----------------------
// DATA (Fully Mapped)
// ----------------------

const navItems = [
  {
    label: "Home",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Account", href: "/account" },
    ],
  },
  {
    label: "Blog",
    items: [
      { label: "All Blog", href: "/blog" },
      { label: "Own Blog", href: "/blog/own" },
    ],
  },
  {
    label: "Category Blog",
    items: [
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
    ].map((cat) => ({
      label: cat,
      href: `/blog/category/${cat.toLowerCase()}`,
    })),
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    href: "/account",
    icon: (
      <lord-icon
        src="https://cdn.lordicon.com/rzsnbiaw.json"
        trigger="hover"
        className="w-9 h-9 lg:w-12 lg:h-12"
      />
    ),
  },
];

// ----------------------
// MAIN COMPONENT
// ----------------------

export function NavigationMenuDemo() {
  return (
    <>
      <Script
        src="https://cdn.lordicon.com/lusqsztk.js"
        strategy="afterInteractive"
      />
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          {navItems.map((item) => (
            <NavigationMenuItem
              key={item.label || item.href}
              className="relative group"
            >
              {item.items ? (
                <>
                  {/* TRIGGER WITH UNDERLINE & LINK */}
                  <NavigationMenuTrigger className="relative group">
                    {item.href ? (
                      <Link href={item.href} className="relative group">
                        {item.label}
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    ) : (
                      <>
                        {item.label}
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                      </>
                    )}
                  </NavigationMenuTrigger>

                  {/* CATEGORY BLOG → 2 COLUMN MENU */}
                  {item.label === "Category Blog" ? (
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 gap-4 w-[260px] lg:w-[350px] p-4">
                        {/* LEFT COLUMN */}
                        <ul className="flex flex-col gap-2">
                          {item.items.slice(0, 5).map((sub, i) => (
                            <li key={i} className="relative group">
                              <NavigationMenuLink asChild>
                                <Link
                                  href={sub.href}
                                  className="relative group"
                                >
                                  {sub.label}
                                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>

                        {/* RIGHT COLUMN */}
                        <ul className="flex flex-col gap-2">
                          {item.items.slice(5).map((sub, i) => (
                            <li key={i} className="relative group">
                              <NavigationMenuLink asChild>
                                <Link
                                  href={sub.href}
                                  className="relative group"
                                >
                                  {sub.label}
                                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  ) : (
                    // OTHER DROPDOWNS
                    <NavigationMenuContent>
                      <ul className="grid gap-2 w-[150px] lg:w-[250px] p-3">
                        {item.items.map((sub, index) => (
                          <li key={index} className="relative group">
                            <NavigationMenuLink asChild>
                              <Link href={sub.href} className="relative group">
                                {sub.label}
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </>
              ) : (
                // DIRECT LINKS
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 relative group"
                  >
                    {item.icon && item.icon}
                    {item.label}
                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
