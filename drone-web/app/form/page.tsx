'use client';

import FormCard from '@/components/formCard';
import Link from 'next/link';

export default function LogFormPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const droneId = process.env.NEXT_PUBLIC_DRONE_ID!;

  return (
    <div className="min-h-[calc(100vh-4rem)] w-screen flex flex-col gap-6 items-center justify-start md:justify-center py-12 px-6">
      <FormCard apiUrl={apiUrl} droneId={droneId} />
    </div>
  );
}