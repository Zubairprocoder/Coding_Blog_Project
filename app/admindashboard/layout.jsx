"use client";
import React from "react";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Home, FileText, Layers, Users } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Dashboard", href: "/admindashboard", icon: Home },
  { label: "Posts", href: "/admindashboard/posts", icon: FileText },
  { label: "Categories", href: "/admindashboard/categories", icon: Layers },
  { label: "Authors", href: "/admindashboard/authors", icon: Users },
];

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-full overflow-hidden">
      {/* ---------------- Desktop Layout (Horizontal) --------------- */}
      <div className="hidden md:block h-full">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Sidebar */}
          <ResizablePanel
            defaultSize={22}
            minSize={15}
            maxSize={40}
            className="border-r bg-muted/40 p-4 flex flex-col"
          >
            <div className="font-bold text-xl mb-6 px-2">Dashboard</div>

            {/* MAP LINKS */}
            <nav className="flex flex-col gap-3 text-sm">
              {links.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition"
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </nav>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main Content */}
          <ResizablePanel className="p-6 overflow-y-auto">
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* ---------------- Mobile Layout (Vertical Resizable) -------- */}
      <div className="block md:hidden h-full">
        <ResizablePanelGroup direction="vertical" className="h-full">
          {/* Mobile Sidebar (Top) */}
          <ResizablePanel defaultSize={35} minSize={20} maxSize={23}>
            <div className="border-b bg-muted/40 p-4 flex flex-col">
              <div className="font-bold text-lg mb-4">Admin Dashboard</div>

              <nav className="flex flex-wrap gap-3 text-sm">
                {links.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition"
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Mobile Content (Bottom) */}
          <ResizablePanel defaultSize={65}>
            <div className="p-4 mt-0 h-full overflow-y-auto">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
