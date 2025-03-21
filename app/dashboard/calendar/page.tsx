'use client';

<<<<<<< HEAD
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
=======
import { useState, useEffect } from 'react';
>>>>>>> 385c25422202b282c9ff151af234ee4b38891c17

interface Birthday {
  id: string;
  name: string;
  dateOfBirth: string;
  role: string;
  department: string;
  daysUntilBirthday: number;
}

<<<<<<< HEAD
const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const { isAuthenticated } = useAuth();
  const [birthdays, setBirthdays] = useState<Birthday[]>([
    {
      id: '1',
      name: 'John Doe',
      dateOfBirth: '2025-03-05',
      role: 'Software Engineer',
      department: 'Engineering',
      daysUntilBirthday: 16,
    },
    {
      id: '2',
      name: 'Jane Smith',
      dateOfBirth: '2025-03-05',
      role: 'Product Manager',
      department: 'Product',
      daysUntilBirthday: 11,
    },
    {
      id: '3',
      name: 'Alice Johnson',
      dateOfBirth: '2025-03-05',
      role: 'Designer',
      department: 'Design',
      daysUntilBirthday: 6,
    },
    {
      id: '4',
      name: 'Michael Brown',
      dateOfBirth: '2025-03-05',
      role: 'Data Scientist',
      department: 'Data',
      daysUntilBirthday: 3,
    },
    {
      id: '5',
      name: 'Emily Davis',
      dateOfBirth: '2025-03-20',
      role: 'Marketing Specialist',
      department: 'Marketing',
      daysUntilBirthday: 1,
    },
    {
      id: '6',
      name: 'Chris Wilson',
      dateOfBirth: '2025-03-22',
      role: 'DevOps Engineer',
      department: 'Engineering',
      daysUntilBirthday: 1,
    },
    {
      id: '7',
      name: 'Sarah Miller',
      dateOfBirth: '2025-03-25',
      role: 'HR Manager',
      department: 'Human Resources',
      daysUntilBirthday: 4,
    },
    {
      id: '8',
      name: 'David Martinez',
      dateOfBirth: '2025-03-27',
      role: 'Backend Developer',
      department: 'Engineering',
      daysUntilBirthday: 6,
    },
    {
      id: '9',
      name: 'Sophia Garcia',
      dateOfBirth: '2025-03-29',
      role: 'Frontend Developer',
      department: 'Engineering',
      daysUntilBirthday: 8,
    },
    {
      id: '10',
      name: 'James Anderson',
      dateOfBirth: '2025-03-31',
      role: 'QA Engineer',
      department: 'Quality Assurance',
      daysUntilBirthday: 10,
    },
  ]);

  // Transform birthdays into events for the calendar
  const events = birthdays.map(birthday => ({
    title: `${birthday.name} (${birthday.role})`,
    start: new Date(birthday.dateOfBirth),
    end: new Date(birthday.dateOfBirth),
    allDay: true,
  }));

  return (
    <div className="size-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}
=======
export default function CalendarPage() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
>>>>>>> 385c25422202b282c9ff151af234ee4b38891c17
