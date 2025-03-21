'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface Birthday {
  id: string;
  name: string;
  dateOfBirth: string;
  role: string;
  department: string;
  daysUntilBirthday: number;
}

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
