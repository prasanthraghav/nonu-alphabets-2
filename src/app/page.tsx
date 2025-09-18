import Image from 'next/image';

export default function Home() {
  return (
    <main className="grid grid-cols-[2fr_3fr] h-full p-20">
      <div className="grid place-items-center">
        <div className="text-center">
          <div className="">A</div>
          <div>Apple</div>
        </div>
      </div>
      <div className="grid place-items-center">
        <div>
          <img
            src="apple.jpeg"
            alt="Apple"
            className="max-w-full h-auto rounded-3xl"
            width={400}
            height={400}
          />
        </div>
      </div>
    </main>
  );
}
