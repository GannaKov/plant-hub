import Header from '@/components/ui/Header/Header';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl">
        <div className="root-container">{children}</div>
      </div>
    </main>
  );
};

export default layout;
