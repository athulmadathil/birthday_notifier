'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );
}
