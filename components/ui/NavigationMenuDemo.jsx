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
import UserMenu from "../UserMenu";
import { useAuth } from "@/lib/contexts/AuthContext";

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

export function NavigationMenuDemo() {
  const { user } = useAuth();

  return (
    <>
      <Script
        src="https://cdn.lordicon.com/lusqsztk.js"
        strategy="afterInteractive"
      />

      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          {/* Render main nav items */}
          {navItems.map((item) => (
            <NavigationMenuItem
              key={item.label || item.href}
              className="relative group"
            >
              {item.items ? (
                <>
                  <NavigationMenuTrigger className="relative group">
                    {item.label}
                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid gap-2 w-[180px] lg:w-[260px] p-3">
                      {item.items.map((sub, index) => {
                        const realHref =
                          user && sub.href === "/account" ? "#" : sub.href;

                        return (
                          <li key={index} className="relative group">
                            <NavigationMenuLink asChild>
                              <Link
                                href={realHref}
                                className={`relative group ${
                                  realHref === "#"
                                    ? "pointer-events-none opacity-40"
                                    : ""
                                }`}
                              >
                                {sub.label}
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <>
                  {/* ACCOUNT icon */}
                  {!user && item.icon ? (
                    <Link href={item.href} className="relative group px-2 py-1">
                      {item.icon}
                    </Link>
                  ) : null}
                </>
              )}
            </NavigationMenuItem>
          ))}

          {/* Dashboard — ONLY when logged in */}
          {user && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/dashboard"
                  className="px-3 py-1 hover:text-blue-600 relative group"
                >
                  Dashboard
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {/* USER MENU — ONLY when logged in */}
          {user && (
            <NavigationMenuItem>
              <UserMenu />
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
