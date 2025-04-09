import React from 'react';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MobileHeader = () => {
  return (
    // <header>
    <div className="absolute top-5 right-5 md:hidden">
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
            <a href="//other1">Other1</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/c/other2">Other2</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    // </header>
  );
};

export default MobileHeader;
