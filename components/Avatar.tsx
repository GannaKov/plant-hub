import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

const AvatarComponent = ({ user_name }: { user_name: string }) => {
  return (
    <Avatar>
      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      <AvatarFallback className="bg-green-700 text-white">
        {getInitials(user_name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
