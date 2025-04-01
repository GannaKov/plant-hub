import KrazLogo from '@/components/kraz-logo';
// import Image from 'next/image';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-col items-center gap-3">
            {/* <Image src="/icons/logo.svg" alt="logo" width={37} height={37} /> */}
            <KrazLogo />
            <h1 className="mb-10 page-title">Plant Hub</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default layout;
