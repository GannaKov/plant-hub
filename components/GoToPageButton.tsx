import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface GoToPageButtonProps {
  text: string;
  destination: string;
}

const GoToPageButton = ({ text, destination }: GoToPageButtonProps) => {
  return (
    <Link
      href={destination}
      className="mb-8 flex w-60 items-center justify-center rounded border border-dark-500 bg-white px-4 py-2 text-black transition-colors duration-300 ease-in-out hover:bg-dark-500 hover:text-white xs:w-80"
    >
      <ArrowLeft className="mr-2" />
      {text}
    </Link>
  );
};

export default GoToPageButton;
