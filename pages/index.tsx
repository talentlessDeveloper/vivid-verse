import Image from 'next/image';
import { DM_Sans } from 'next/font/google';
import Header from '@/components/header/header';
import Link from 'next/link';

// const inter = Inter({ subsets: ['latin'] })
const dm = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm',
  weight: ['400', '500', '700'],
});

export default function Home() {
  return (
    <div className={`${dm.variable}`}>
      <Header />
      <main className="relative">
        <div className="h-screen lg:flex ">
          <div className="w-full h-full">
            <div className="w-10/12 mx-auto lg:pl-20 flex flex-col gap-2 h-full justify-center">
              <h1 className="overflow-hidden  mt-72 lg:mt-0">
                <span className="text-4xl inline-block">
                  Welcome To VividVerse
                </span>
              </h1>

              <div className="w-[13rem]">
                <Link
                  href="/feeds"
                  className="bg-slate-800 text-center font-playfair text-xl block  px-3 py-2 mt-8 w-full transition-colors duration-500 dark:hover:bg-slate-950 dark:text-neutral-50 text-zinc-700 hover:text-neutral-50 hover:bg-zinc-700 "
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 absolute top-20 right-3 w-60 h-60 px-3 lg:static lg:w-full lg:h-full flex justify-center items-center">
            <p className="mt-4 max-w-lg text-xl text-slate-100 hidden lg:block">
              Step into a world where words paint vivid pictures and stories
              come alive. Welcome to VividVerse, the immersive blog app that
              transcends the boundaries of imagination. Unleash your creativity,
              share your passions, and connect with a community of like-minded
              souls. Dive deep into the kaleidoscope of stories and let your
              voice shine in this vibrant realm of inspiration.
            </p>
            <p className="mt-4 max-w-lg  text-slate-100 block lg:hidden">
              A world where words paint vivid pictures and stories come alive
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
