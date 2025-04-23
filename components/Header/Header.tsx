'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import Link from 'next/link';
// import Image from 'next/image';
import { usePathname } from 'next/navigation';

import MobileHeader from './MobileHeader';
import { Session } from 'next-auth';
import AvatarComponent from '../Avatar';
import LogOutBtn from '../LogOutBtn';

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const user_name = session?.user?.name || 'IN';
  return (
    <>
      <header className="flex w-full justify-between bg-dark-500 p-5 text-light-100">
        <div className="flex-1/6">
          <Link href="/">
            {/* <Image src="/icons/logo.svg" alt="logo" width={40} height={40} /> */}
            LOGO
          </Link>
        </div>

        <ul className="hidden flex-3/6 flex-row items-center justify-around md:flex">
          <li>
            <Link
              href="/"
              className={cn(
                'cursor-pointer text-base capitalize',
                pathname === '/' ? 'text-light-200' : 'text-light-100'
              )}
            >
              Обладнання
            </Link>
          </li>
          <li>
            <Link
              href="/other1"
              className={cn(
                'cursor-pointer text-base capitalize',
                pathname === '/other1' ? 'text-light-200' : 'text-light-100'
              )}
            >
              Other1
            </Link>
          </li>
          <li>
            <Link
              href="/other2"
              className={cn(
                'cursor-pointer text-base capitalize',
                pathname === '/other2' ? 'text-light-200' : 'text-light-100'
              )}
            >
              Other2
            </Link>
          </li>
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          <AvatarComponent user_name={user_name} />
          <LogOutBtn />
        </div>

        <MobileHeader user_name={user_name} />
      </header>
    </>
  );
};

export default Header;
