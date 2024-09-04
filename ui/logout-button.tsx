'use client';
import { logout } from '@/actions/actions';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.push('/');
  };

  return <button onClick={onLogout}>&#9658; Log out</button>;
}
