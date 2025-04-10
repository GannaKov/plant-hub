import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2>УПС....</h2>
      <p>Щось трапилось</p>
      <Link
        href="/"
        className="flex w-36 items-center justify-center rounded-lg border border-dark-500 p-2 capitalize"
      >
        До Головної
      </Link>
    </div>
  );
}
