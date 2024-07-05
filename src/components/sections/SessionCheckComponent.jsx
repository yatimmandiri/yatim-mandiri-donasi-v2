'use client';

import { UseAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export const SessionCheckComponent = () => {
  const { session, logout } = UseAuth();

  return (
    <div>
      <p>
        {session ? (
          session.email
        ) : (
          <Link href={'/auth/login'}>Belum Login</Link>
        )}
      </p>
      {session && <button onClick={() => logout()}>Logout</button>}
    </div>
  );
};
