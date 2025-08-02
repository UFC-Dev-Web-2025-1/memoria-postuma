'use client'
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/utils/auth';

interface AuthLayoutProps {
  children: ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();

  // useEffect(() => {
  //   if (!authService.isAuthenticated()) {
  //     router.push('/login');
  //   }
  // }, []);

  if (!authService.isAuthenticated()) {
    if (window.confirm('Você não está autorizado a acessar essa página!').valueOf()) router.push('/login');
  } else {
    return <div>{children}</div>
  }

}