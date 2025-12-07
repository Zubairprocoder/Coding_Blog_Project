"use client";
import Link from "next/link";

const navLinks = ["Home", "About", "Blog", "Contact"];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-3">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-around items-center md:items-center gap-8 md:gap-0">
        {/* Logo + Description */}
        <div className="flex flex-col items-start justify-start ">
          <span className="text-2xl font-bold text-blue-400">CodeSphere</span>
          <p className="text-gray-300 mt-2 max-w-xs">
            Sharing coding knowledge, tutorials, and projects with the developer
            community.
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col  gap-4 md:gap-6 mt-4 md:mt-0">
          {navLinks.map((link) => (
            <li key={link}>
              <Link
                href={`/${link.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors"
              >
                {link}
              </Link>
            </li>
          ))}
          <div className="w-full  py-4 text-center text-sm text-gray-500">
            Icons by{" "}
            <Link
              href="https://lordicon.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lordicon.com
            </Link>
          </div>
        </ul>

        {/* Social Media / Placeholder */}
        <div className="flex flex-col  gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400 transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-gray-500 text-sm text-center md:text-left max-w-7xl mx-auto px-4">
        &copy; {new Date().getFullYear()} CodeSphere. All rights reserved.
      </div>
    </footer>
  );
}
