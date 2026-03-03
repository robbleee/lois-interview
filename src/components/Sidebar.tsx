"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ArrowLeftRight,
  FileText,
  GraduationCap,
  MessageSquare,
  Ship,
  BookOpenText,
  Trophy,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "Who Is Reach Subsea?", href: "/about", icon: BookOpenText },
  { name: "1 — Know the Company", href: "/module-1", icon: Building2 },
  { name: "2 — Your Skills, Reframed", href: "/module-2", icon: ArrowLeftRight },
  { name: "3 — Offshore Documents", href: "/module-3", icon: FileText },
  { name: "4 — Engineering Registration", href: "/module-4", icon: GraduationCap },
  { name: "5 — Practice Questions", href: "/module-5", icon: MessageSquare },
  { name: "Full Quiz — Test Everything", href: "/quiz", icon: Trophy },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-subsea-950 text-white shadow-xl flex-shrink-0">
      <div className="flex h-20 items-center justify-center border-b border-subsea-800 px-6">
        <Ship className="mr-3 h-8 w-8 text-subsea-400 flex-shrink-0" />
        <h1 className="text-base font-bold tracking-tight leading-tight">Interview Prep</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-subsea-800 text-white shadow-md"
                  : "text-subsea-200 hover:bg-subsea-800/50 hover:text-white"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? "text-subsea-400" : "text-subsea-400/70"
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-subsea-800">
        <div className="rounded-lg bg-subsea-900 p-4 text-xs text-subsea-200">
          <p className="font-semibold text-white mb-1">Role you are applying for</p>
          <p>Graduate Project Engineer</p>
          <p className="mt-2 font-semibold text-white mb-1">Company & Location</p>
          <p>Reach Subsea — Aberdeen, UK</p>
        </div>
      </div>
    </div>
  );
}
