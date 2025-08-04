'use client'
import dynamic from 'next/dynamic';

const CreateMemorialClient = dynamic(() => import('../components/CreateMemorialClient'), {
  ssr: false
});

export default function Page() {
  return <CreateMemorialClient />;
}
