import React from 'react';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import AvatarComponent from '../Avatar';
import LogOutBtn from '../LogOutBtn';

const MobileHeader = ({ user_name }: { user_name: string }) => {
  return (
    // <header>
    <div className="absolute top-5 right-5 md:hidden">
      {/* <div className="flex md:hidden">
        <AvatarComponent user_name={user_name} />
      </div> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Menu className="h-8 w-8" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-6 uppercase">
          <DropdownMenuItem asChild>
            <a href="/">Обладнання</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/other1">Other1</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/other2">Other2</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="mt-4">
            <div className="flex items-center justify-between gap-4">
              <AvatarComponent user_name={user_name} />
              <LogOutBtn />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    // </header>
  );
};

export default MobileHeader;
