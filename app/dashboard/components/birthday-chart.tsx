'use client';

import { people } from "@/lib/data";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function BirthdayChart() {
  // Calculate birthday distribution by month
  const monthData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    count: 0,
  }));

  people.forEach(person => {
    const date = new Date(person.dateOfBirth);
    monthData[date.getMonth()].count++;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={monthData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar
          dataKey="count"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
} 