import KrazLogo from '@/components/kraz-logo';
// import Image from 'next/image';
import { auth } from '@/auth';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect('/');
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-col items-center gap-3">
            <KrazLogo />
            {/* <h1 className="mb-10 page-title">Plant Hub</h1> */}
          </div>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default layout;
