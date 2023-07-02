import Feed from '@/components/feeds/feed';
import VerifiedAuthLayout from '@/components/shared/verifiedAuthLayout';
import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { convertDate } from '@/utils/convertDate';
import Link from 'next/link';
import { PreviewFeedProps } from '@/components/feeds/previewFeed';
import Loader from '@/components/svg/loader';
import { CreateFeed } from '@/constant/validation/types';
import Image from 'next/image';

type Feed = CreateFeed & { id: string; content: string };

const Page: NextPageWithLayout = () => {
  const [feeds, setFeeds] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeeds = async () => {
      setLoading(true);
      try {
        // const q = query(collection(db, 'cities'), where('capital', '==', true));

        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, ' => ', doc.data());
        // });
        const feedsRef = collection(db, 'Feeds');
        const q = query(feedsRef, orderBy('createdAt', 'desc'));
        const feedsCollection = await getDocs(q);
        const feedsData = feedsCollection.docs.map((feed) => {
          return {
            ...feed.data(),
            id: feed.id,
          };
        });

        setFeeds(feedsData);
        setLoading(false);
      } catch (err: any) {
        console.error(err.message);
        alert(err.message);
      }
    };
    getFeeds();
  }, []);

  if (loading || feeds.length <= 0)
    return (
      <div className="flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader size="w-10 h-10" />
      </div>
    );

  return (
    <section>
      <div className="w-10/12 mx-auto">
        {/* {!feeds.length ? (
          <div>You have {feeds.length} Posts</div>
        ) : ( */}
        <div>
          {feeds.map((feed: any) => {
            return (
              <Link
                key={feed.id}
                href={`feed/${encodeURIComponent(feed.id)}`}
                // href={{
                //   pathname: '/feed/[id]',
                //   query: { slug: feed.id },
                // }}
              >
                <div className="shadow-md text-lg font-mono py-3 px-2 mt-2 space-y-2">
                  <div>
                    <div className="w-full">
                      {feed.imageUrl ? (
                        <Image
                          src={feed.imageUrl}
                          alt=""
                          className="w-full h-40 lg:h-[400px]  object-cover"
                          width="0"
                          height="0"
                          unoptimized
                        />
                      ) : null}
                    </div>
                    <div className="flex-grow">
                      <div className="flex gap-x-2 py-3">
                        {feed.tags.map((tag: string[], i: any) => (
                          <p
                            key={`p-${tag}-${i}`}
                            className="text-base text-blue-600 mt-2"
                          >
                            #{tag}
                          </p>
                        ))}
                      </div>
                      <h2 className="font-semibold md:text-2xl">
                        {feed.title}
                      </h2>
                      <div className="flex gap-x-3">
                        <p>{feed.author.name}</p>
                        <p>{convertDate(feed.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* )} */}
      </div>
    </section>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <VerifiedAuthLayout>{page}</VerifiedAuthLayout>;
};

export default Page;

// export const getServerSideProps = async () => {
//   let feeds;
//   try {
//     const postsRef = collection(db, 'Feeds');
//     const q = query(postsRef, orderBy('createdAt', 'desc'));
//     const postsCollection = await getDocs(q);
//     feeds = await postsCollection.docs.map((post) => {
//       return {
//         ...post.data(),
//         id: post.id,
//       };
//     });
//   } catch (err: any) {
//     console.error(err.message);
//   }
//   return {
//     props: {
//       feeds,
//     },
//   };
// };
