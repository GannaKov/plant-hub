import React from 'react'
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/auth';

const LogOutBtn = () => {
  return (
    <form action={logout}>
      <Button className="hover: bg-orange-300 text-black transition-colors duration-200 ease-in-out hover:bg-orange-400">
        Logout
      </Button>
    </form>
  );
};

export default LogOutBtn;
