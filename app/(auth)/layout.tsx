import KrazLogo from '@/components/kraz-logo';
// import Image from 'next/image';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            {/* <Image src="/icons/logo.svg" alt="logo" width={37} height={37} /> */}
            <KrazLogo />
            <h1 className="text-2xl font-semibold text-white">Plant Hub</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default layout;
