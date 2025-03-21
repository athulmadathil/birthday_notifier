export interface Person {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  role: 'student' | 'staff';
  department: string;
}

// Sample data
export const people: Person[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    dateOfBirth: '1990-03-15',
    role: 'staff',
    department: 'Engineering'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    dateOfBirth: '1995-03-18',
    role: 'student',
    department: 'Computer Science'
  },
  // Add more sample data as needed
];

export interface Template {
  id: string;
  name: string;
  role: 'student' | 'staff';
  content: string;
}

export const cardTemplates: Template[] = [
  {
    id: '1',
    name: 'Student Birthday Template',
    role: 'student',
    content: 'Happy Birthday, dear student! 🎉'
  },
  {
    id: '2',
    name: 'Staff Birthday Template',
    role: 'staff',
    content: 'Happy Birthday, dear colleague! 🎂'
  }
];

export const emailTemplate = {
  subject: 'Happy Birthday!',
  body: `Dear {name},

Wishing you a fantastic birthday filled with joy and happiness!

Best regards,
The Birthday Notifier Team`
}; 