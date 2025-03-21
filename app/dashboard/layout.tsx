<<<<<<< HEAD
import SideBar from '@/components/SideBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-5 max-h-screen max-w-screen">
      <SideBar />
      <div className="flex-1 px-5 pt-10">{children}</div>
    </div>
  );
}
=======
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CalendarDays, Mail, FileText, Home } from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarItem({ href, icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
        isActive && "bg-gray-100 text-gray-900"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-900">Birthday Notifier</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            <SidebarItem
              href="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Overview"
            />
            <SidebarItem
              href="/dashboard/email"
              icon={<Mail className="h-5 w-5" />}
              label="Email Settings"
            />
            <SidebarItem
              href="/dashboard/templates"
              icon={<FileText className="h-5 w-5" />}
              label="Email Templates"
            />
            <SidebarItem
              href="/dashboard/birthdays"
              icon={<CalendarDays className="h-5 w-5" />}
              label="Birthdays"
            />
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
} 
>>>>>>> 385c25422202b282c9ff151af234ee4b38891c17
