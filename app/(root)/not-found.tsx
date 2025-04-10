import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2>УПС....</h2>
      <p>В нас нема такого обладнання</p>
      <Link
        href="/"
        className="flex w-20 items-center justify-center border border-dark-500 capitalize"
      >
        До Головноі
      </Link>
    </div>
  );
}
