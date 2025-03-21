<<<<<<< HEAD
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
=======
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
>>>>>>> 385c25422202b282c9ff151af234ee4b38891c17

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'Birthday Notifier',
  description: 'A system to manage and send birthday notifications',
=======
  title: "Birthday Notifier",
  description: "A simple birthday notification system",
>>>>>>> 385c25422202b282c9ff151af234ee4b38891c17
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
<<<<<<< HEAD
        <AuthProvider>
          <div className="h-screen bg-gray-100">
            <main>{children}</main>
          </div>
        </AuthProvider>
=======
        {children}
        <Toaster />
>>>>>>> 385c25422202b282c9ff151af234ee4b38891c17
      </body>
    </html>
  );
}
