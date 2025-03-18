'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Birthday {
  id: string;
  name: string;
  dateOfBirth: string;
  role: string;
  department: string;
  daysUntilBirthday: number;
}

export default function CalendarPage() {
  const { isAuthenticated } = useAuth();
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (isAuthenticated) {
      fetchBirthdays();
    }
  }, [isAuthenticated, selectedMonth, selectedYear]);

  const fetchBirthdays = async () => {
    try {
      const response = await fetch(`/api/birthdays?month=${selectedMonth + 1}&year=${selectedYear}`);
      if (response.ok) {
        const data = await response.json();
        setBirthdays(data);
      }
    } catch (error) {
      console.error('Failed to fetch birthdays:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (month: number) => {
    return new Date(2000, month).toLocaleString('default', { month: 'long' });
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Birthday Calendar</h1>
        <div className="flex space-x-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {getMonthName(i)}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() + i}>
                {new Date().getFullYear() + i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">
            Upcoming Birthdays in {getMonthName(selectedMonth)} {selectedYear}
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {birthdays.map((birthday) => (
              <li key={birthday.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {new Date(birthday.dateOfBirth).getDate()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{birthday.name}</div>
                      <div className="text-sm text-gray-500">
                        {birthday.role} • {birthday.department}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {birthday.daysUntilBirthday === 0
                      ? 'Today'
                      : `${birthday.daysUntilBirthday} days until birthday`}
                  </div>
                </div>
              </li>
            ))}
            {birthdays.length === 0 && (
              <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                No birthdays found for this month
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 