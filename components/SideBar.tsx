import { Home, Calendar, User, Settings } from 'lucide-react'; // Import icons from Lucide
import Link from 'next/link'; // Import Link from Next.js

export default function SideBar() {
  const data = [
    {
      icon: <Home className="w-5 h-5" />, // Icon for Home
      link: '/dashboard/home',
      label: 'Home',
    },
    {
      icon: <Calendar className="w-5 h-5" />, // Icon for Calendar
      link: '/dashboard/calendar',
      label: 'Calendar',
    },
    {
      icon: <User className="w-5 h-5" />, // Icon for Profile
      link: '/profile',
      label: 'Profile',
    },
    {
      icon: <Settings className="w-5 h-5" />, // Icon for Settings
      link: '/settings',
      label: 'Settings',
    },
  ];

  return (
    <ul className="w-56 h-screen bg-gray-200 text-black flex flex-col px-5 pt-10 gap-4">
      {data.map((item, index) => (
        <li key={index} className="flex items-center space-x-3">
          {item.icon}
          <Link href={item.link} className="text-lg">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
