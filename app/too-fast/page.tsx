import React from 'react';

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-5xl font-bold text-dark-400">
        Ого, Ти занадто швидкий, Спокійніше!
      </h1>
      <p className="max-w-xl text-center text-2xl text-dark-200">
        Схоже, ти був занадто нетерплячим. Ми поставили тимчасову паузу на
        твоєму ентузіазмі. 🚦 Спокійно, спробуй знову трохи пізніше.
      </p>
    </main>
  );
};
export default Page;
