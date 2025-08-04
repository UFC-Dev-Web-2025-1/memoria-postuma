'use client'
import dynamic from 'next/dynamic';

const DetailsClientComponent = dynamic(() => import('../components/DetailsClientComponent'), {
  ssr: false
});

export default function Page() {
  return <DetailsClientComponent />;
}
