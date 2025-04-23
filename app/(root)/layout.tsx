import Header from '@/components/Header/Header';
import { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect('/sign-in');
  return (
    <main>
      <Header session={session} />
      <div className="mx-auto max-w-7xl">
        <div className="root-container">{children}</div>
      </div>
    </main>
  );
};

export default layout;
