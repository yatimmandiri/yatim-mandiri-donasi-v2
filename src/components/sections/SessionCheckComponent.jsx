'use client';

import { UseAuth } from '@/hooks/useAuth';

export const SessionCheckComponent = () => {
  const { session, logout } = UseAuth();

  return (
    <div>
      <p>{session ? session.email : 'Belum Login'}</p>
      {session && <button onClick={() => logout()}>Logout</button>}
    </div>
  );
};
